import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '~/Firebase/Firebase';
import { useToast } from '@chakra-ui/react';
import useAuthStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
const useLogout = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const toast = useToast();

    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const { unsubcribe } = useAuthStore();
    const handlerSignout = async () => {
        try {
            if (unsubcribe) unsubcribe();
            await signOut();
            localStorage.removeItem('user-info');
            logout();
            navigate('/auth');
        } catch (error) {
            toast({ title: 'Error', description: error.message, status: 'error' });
        }
    };
    return { loading, error, handlerSignout };
};

export default useLogout;
