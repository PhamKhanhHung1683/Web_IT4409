import { useToast } from '@chakra-ui/react';
import { addDoc, collection } from 'firebase/firestore';
import  { useState } from 'react';
import { firestore } from '~/Firebase/Firebase';
import useAuthStore from '~/stores/authStore';

const useInvite = () => {
    const [loading, setLoading] = useState(false);
    const [invited, setInvited] = useState(false);
    const { user } = useAuthStore();
    const toast = useToast();
    const invite = async (gamename, friendid, gameid) => {
        setLoading(true);
        try {
            const notificationDoc = {
                type: gamename,
                content: '',
                postid: gameid,
                createdat: Date.now(),
                createdby: user.uid,
                to: friendid,
            };
            await addDoc(collection(firestore, 'notifications'), notificationDoc);
            setInvited(true);
        } catch (error) {
            toast({ title: error.message, status: 'error' });
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        invited,
        invite,
    };
};

export default useInvite;
