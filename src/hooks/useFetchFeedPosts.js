import { useToast } from '@chakra-ui/react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '~/Firebase/Firebase';
import useAuthStore from '~/stores/authStore';
import usePostStore from '~/stores/postStore';
const useFetchFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthStore();
    const toast = useToast();
    const { postlist, setpostlist } = usePostStore();
    const getFeedPosts = async () => {
        console.log("call function")
        try {
            if (user.following.length === 0) {
                setpostlist([]);
                setIsLoading(false);
                return;
            }
            let q = query(
                collection(firestore, 'posts'),
                where('createdby', 'in', user.following),
                orderBy('createdat', 'desc'),
            );
            const querySnapshot = await getDocs(q);
            let posts = [];
            querySnapshot.forEach((post) => {
                posts.push(post.id);
            });
            if (posts.length > 0) {
                setpostlist(posts);
            } else {
                setpostlist([])
                //get post of unfollower
            }
        } catch (error) {
            toast({ title: 'Error at fetch feed posts', description: error.message, status: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (user) {
            getFeedPosts();
        }
    }, [user]);

    return { isLoading, getFeedPosts, postlist };
};

export default useFetchFeedPosts;
