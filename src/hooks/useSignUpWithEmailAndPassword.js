import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '~/Firebase/Firebase';
import { useToast } from '@chakra-ui/react';
import useAuthStore from '~/stores/authStore';
import { useNavigate } from 'react-router-dom';
const useSignUpWithEmailAndPassword = () => {
    const toast = useToast();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.confirmPassword || !inputs.name || !inputs.nickname) {
            toast({ title: 'Error', description: 'Please fill all field', status: 'error' });
            return;
        }
        if(inputs.nickname.includes('@')){
            toast({ title: 'Error', description: 'Do not include @ in nickname', status: 'error' });
            return;
        }
        if(inputs.password != inputs.confirmPassword){
            toast({ title: 'Error', description: 'Please confirm password correctly', status: 'error' });
            return;
        }
        if(inputs.password.length <= 8){
            toast({ title: 'Error', description: 'Your password has at least 8 character', status: 'error' });
            return;
        }
        const q = query(collection(firestore, 'users'), where('nickname', '==', inputs.nickname));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            toast({ title: 'Error', description: 'Nick name has been existed!', status: 'error' });
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!userCredential && error) {
                console.log(error);
                toast({
                    title: 'The account cannot be created',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }
            if (userCredential) {
                const userDoc = {
                    uid: userCredential.user.uid,
                    email: inputs.email,
                    backgroundimage: '',
                    avatarimage: '',
                    name: inputs.name,
                    nickname: inputs.nickname,
                    bio: '',
                    location: '',
                    website: '',
                    birthday: '',
                    joinedat: Date.now(),
                    following: [],
                    follower: [],
                };
                await setDoc(doc(firestore, 'users', userCredential.user.uid), userDoc);
                localStorage.setItem('user-info', JSON.stringify(userDoc));
                login(userDoc);

                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'The account can not be created',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };
    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
