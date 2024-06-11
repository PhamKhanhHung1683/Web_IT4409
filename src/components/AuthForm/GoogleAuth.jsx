import { Flex, Image, Text, useToast } from '@chakra-ui/react';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '~/Firebase/Firebase';
import useAuthStore from '~/stores/authStore';
const GoogleAuth = () => {
    const [signInWithGoogle, error] = useSignInWithGoogle(auth);
    const toast = useToast();
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const handlerAuth = async () => {
        try {
            const userCredential = await signInWithGoogle();
            if (!userCredential && error) {
                toast({ title: 'Error', description: error, status: 'error' });
                return;
            }
            if (userCredential) {
                let userDoc;
                //login
                const userSnapshot = await getDoc(doc(firestore, 'users', userCredential.user.uid));
                if (!userSnapshot.exists()) {
                    userDoc = {
                        uid: userCredential.user.uid,
                        email: userCredential.user.email,
                        backgroundimage: '',
                        avatarimage: userCredential.user.photoURL,
                        name: userCredential.user.displayName,
                        nickname: "@" + userCredential.user.email.split('@')[0],
                        bio: '',
                        location: '',
                        website: '',
                        birthday: '',
                        joinedat: Date.now(),
                        following: [],
                        follower: [],
                    };
                    await setDoc(doc(firestore, 'users', userCredential.user.uid), userDoc);
                    toast({ description: 'Your account just created!', status: 'success' });
                } else {
                    userDoc = userSnapshot.data();
                }

                localStorage.setItem('user-info', JSON.stringify(userDoc));
                login(userDoc);
                navigate('/');
            }
        } catch (error) {
            toast({ title: 'Error', description: error.message, status: 'error' });
        }
    };
    return (
        <Flex cursor={'pointer'} justifyContent={'center'} alignItems={'center'} gap={4}>
            <Image src="/google_icon.png" alt="google signin" h={6} />
            <Text color={'green'} onClick={handlerAuth}>
                Log in with Google
            </Text>
        </Flex>
    );
};

export default GoogleAuth;
//problem:
//create account with google may create not unique nickname
//not been solved
