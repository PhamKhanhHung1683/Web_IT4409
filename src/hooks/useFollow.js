import { useEffect, useState } from 'react';
import useAuthStore from '../stores/authStore';
import { addDoc, arrayRemove, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import { useToast } from '@chakra-ui/react';

const useFollow = (uid) => {
    const { user } = useAuthStore();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isUpdating, SetIsUpdating] = useState(false);
    const toast = useToast();
    const handlerFollow = async () => {
        SetIsUpdating(true);
        console.log(uid);
        try {
            if (isFollowing) {
                //unfollow
                //delete following of current user
                await updateDoc(doc(firestore, 'users', user.uid), {
                    following: arrayRemove(uid),
                });
                //delete follower of userprofile
                await updateDoc(doc(firestore, 'users', uid), {
                    follower: arrayRemove(user.uid),
                });
            } else {

                //follow
                await updateDoc(doc(firestore, 'users', user.uid), {
                    following: arrayUnion(uid),
                });
                await updateDoc(doc(firestore, 'users', uid), {
                    follower: arrayUnion(user.uid),
                });
                //create notification
                await addDoc(collection(firestore, 'notifications'), {
                    type: 'follow',
                    content: '',
                    createdat: Date.now(),
                    createdby: user.uid,
                    to: uid,
                    postid:""
                });
            }
        } catch (error) {
            console.log('error', error);
            toast({ title: 'Error on follow', description: error.message, status: 'error' });
        } finally {
            SetIsUpdating(false);
        }
    };
    useEffect(() => {

        if (user && uid) {
            const isFollowing = user.following.includes(uid);
            setIsFollowing(isFollowing);
        }
    }, [user, uid]);
    return { isFollowing, handlerFollow, isUpdating };
};

export default useFollow;
