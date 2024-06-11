import { useToast } from '@chakra-ui/react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '~/Firebase/Firebase';

const useFetchPostById = (id) => {
    const [postDoc, setPostDoc] = useState();
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    useEffect(() => {
        let unsubcribe;

        const fetchPostById = async () => {
            try {
                setLoading(true);
                const postSnapShot = await getDoc(doc(firestore, 'posts', id));

                if (postSnapShot.exists()) {
                    setPostDoc({ id, ...postSnapShot.data() });
                    unsubcribe = onSnapshot(doc(firestore, 'posts', id), (p) => {
                        setPostDoc({ id, ...p.data() });
                    });
                } else {
                    // toast({ title: '404 not found', status: 'error' });
                }
            } catch (error) {
                console.log('error in post', error);
                toast({ title: 'Error in post id', description: error.message, status: 'error' });
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchPostById();
        return unsubcribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return { postDoc, loading };
};

export default useFetchPostById;
