import { useEffect, useState } from 'react';

import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { firestore } from '~/Firebase/Firebase';
import useUserProfileStore from '~/stores/profileStore';
import { useToast } from '@chakra-ui/react';
const useGetProfileByNickname = (nickname) => {
    const [loading, setLoading] = useState(true);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const toast = useToast();
    useEffect(() => {
        const q = query(collection(firestore, 'users'), where('nickname', '==', nickname));
        let unsubcribe;
        const getUserProfile = async () => {
            let userDoc;
            try {
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    // toast({ title: 'Error', description: "The profile doesn't exist!", status: 'error' });
                    setLoading(false);
                    return;
                }
                // eslint-disable-next-line no-loop-func
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });
            } catch (error) {
                // toast({ title: 'Error', description: error.message, status: 'error' });
            }
            setUserProfile(userDoc);
            unsubcribe = onSnapshot(q, (querySnapshot) => {
                let changedUser;
                querySnapshot.forEach((doc) => {
                    changedUser = doc.data();

                    setUserProfile(changedUser);
                });
            });
            setLoading(false);
        };
        getUserProfile();
        return unsubcribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nickname, setUserProfile]);
    return { loading, userProfile };
};

export default useGetProfileByNickname;
