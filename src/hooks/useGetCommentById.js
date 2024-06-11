import { useToast } from '@chakra-ui/react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import  { useEffect, useState } from 'react';
import { firestore } from '~/Firebase/Firebase';

const useGetCommentById = (id) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userDoc, setUserDoc] = useState();
    const [commentDoc, setCommentDoc] = useState();
    const toast = useToast();
    useEffect(() => {
        let unsubcribe;
        const getCommentById = async () => {
            setIsLoading(true);
            try {
                const commentSnapShot = await getDoc(doc(firestore, 'comments', id));
                if (!commentSnapShot.exists()) {
                    toast({ title: 'Error', description: 'Comment not Exits', status: 'error' });
                    return;
                }
                unsubcribe = onSnapshot(doc(firestore, 'comments', commentSnapShot.id), (commentSnapShot) => {
                    setCommentDoc(commentSnapShot.data());
                });
                setCommentDoc(commentSnapShot.data());
                const userSnapShot = await getDoc(doc(firestore, 'users', commentSnapShot.data().createdby));
                if (!userSnapShot.exists()) {
                    toast({ title: 'Error', description: 'Comment not Exits', status: 'error' });
                    return;
                }
                setUserDoc(userSnapShot.data());
            } catch (error) {
                toast({ title: 'Error', description: error.message, status: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        getCommentById();
        return unsubcribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return { isLoading, userDoc, commentDoc };
};

export default useGetCommentById;
