import { useToast } from '@chakra-ui/react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '~/Firebase/Firebase';
import useAuthStore from '~/stores/authStore';

const useFetchNotification = () => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const toast = useToast();
    const { user } = useAuthStore();
    useEffect(() => {
        let unsubcribe;
        const getNotification = async () => {
            setLoading(true);
            try {
                unsubcribe = onSnapshot(
                    query(
                        collection(firestore, 'notifications'),
                        where('to', '==', user.uid),
                        orderBy('createdat', 'desc'),
                    ),
                    (querySnapShot) => {
                        const listNoti = [];
                        querySnapShot.forEach((doc) => {
                            listNoti.push({ id: doc.id, ...doc.data() });
                        });
                        setNotifications(listNoti);
                    },
                );
            } catch (error) {
                toast({ title: 'Error to fetch notification', description: error.message, status: 'error' });
            } finally {
                setLoading(false);
            }
        };
        if (user) getNotification();
        return unsubcribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return { loading, notifications };
};

export default useFetchNotification;
