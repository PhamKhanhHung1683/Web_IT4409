import { useToast } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '~/Firebase/Firebase';

const useGetUserById = (id) => {
    const [isLoading, setIsloading] = useState(false);
    const [user, setUser] = useState();
    const toast = useToast();
    useEffect(() => {
        const getUser = async () => {
            setIsloading(true);
            try {
                const UserSnapShot = await getDoc(doc(firestore, 'users', id));
                if (UserSnapShot.exists()) {
                    setUser(UserSnapShot.data());
                } else {
                    toast({ title: 'Error to get user by id', description: 'user not exits', status: 'error' });
                    return;
                }
            } catch (error) {
                toast({ title: 'Error to get user by id', description: error.message, status: 'error' });
            } finally {
                setIsloading(false);
            }
        };
        if (id) getUser();
        else setUser(null);
    }, [id]);
    return { isLoading, user };
};

export default useGetUserById;
