import { useToast } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '~/Firebase/Firebase';
import useAuthStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
const useLogin = () => {
    const toast = useToast();
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const loginWithEmailAndPassword = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            toast({ title: 'Error', description: 'Please fill your email and password', status: 'error' });
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCredential) {
                const userDoc = await getDoc(doc(firestore, 'users', userCredential.user.uid));
                localStorage.setItem('user-info', JSON.stringify(userDoc.data()));
                login(userDoc.data());
                
                navigate('/');
            }
        } catch (error) {
            toast({ title: 'Error', description: error.message, status: 'error' });
        }
    };
    return { loginWithEmailAndPassword, loading, error };
};

export default useLogin;
