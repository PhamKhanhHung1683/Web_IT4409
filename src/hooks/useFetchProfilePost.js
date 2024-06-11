import { useToast } from '@chakra-ui/react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '~/Firebase/Firebase';
import usePostStore from '~/stores/postStore';

const useFetchProfilePost = (userProfile) => {
    const [loadingPost, setLoadingPost] = useState(false);
    const { postlist, setpostlist } = usePostStore();

    const toast = useToast();
    useEffect(() => {
        let unsubcribe;
        const fetchProfilePage = async () => {
            setLoadingPost(true);
            try {
                unsubcribe = onSnapshot(
                    query(
                        collection(firestore, 'posts'),
                        where('createdby', '==', userProfile.uid),
                        orderBy('createdat', 'desc'),
                    ),
                    (querySnapshot) => {
                        console.log(querySnapshot);
                        let posts = [];
                        querySnapshot.forEach((doc) => posts.push(doc.id));
                        setpostlist(posts);
                    },
                );
            } catch (error) {
                toast({ title: 'Error profile post', description: error.message, status: 'error' });
            } finally {
                setLoadingPost(false);
            }
        };
        if (userProfile) fetchProfilePage();
        return unsubcribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile]);
    return { loadingPost, postlist };
};

export default useFetchProfilePost;
