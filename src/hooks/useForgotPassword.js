import { useToast } from '@chakra-ui/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '~/Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

const useForgotPassword = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const forgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast({
                title: 'Email sent',
                description: 'A password reset email has been sent to your email address.',
                status: 'success',
            });
            
            navigate('/auth'); 
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
            });
        }
    };

    return { forgotPassword };
};

export default useForgotPassword;