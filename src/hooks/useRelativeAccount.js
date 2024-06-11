import { useEffect, useState } from 'react';
import useAuthStore from '~/stores/authStore';
import { firestore } from '~/Firebase/Firebase';
import {  collection, getDocs, or, query, where } from 'firebase/firestore';
const useRelativeAccount = () => {
    const { user } = useAuthStore();
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const q = query(
                collection(firestore, 'users'),
                or(where('follower', 'array-contains', user.uid), where('following', 'array-contains', user.uid)),
            );
            const querySnapshot = await getDocs(q);
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });
            console.log('qrsnsho', list);
            setListUser(list);
        };
        if (user) {
            fetchUsers();
        }
    }, [user]);
    return { listUser };
};

export default useRelativeAccount;
