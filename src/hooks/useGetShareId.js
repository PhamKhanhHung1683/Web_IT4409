import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '~/Firebase/Firebase';


const getPostByShareId = async (shareId) => {
    const postSnapShot = await getDoc(doc(firestore, 'posts', shareId));
    if (postSnapShot.exists()) {
        return { id: postSnapShot.id, ...postSnapShot.data() };
    }
    return null;
};

const useGetFinalShareId = ({ postDoc }) => {
    const [finalShareId, setFinalShareId] = useState(null);

    useEffect(() => {
        const findFinalShareId = async () => {
            let currentPost = postDoc;
            while (currentPost && currentPost.share && currentPost.share !== "") {
                currentPost = await getPostByShareId(currentPost.share);
            }
            if (currentPost) {
                setFinalShareId(currentPost.id);
            }
        };

        if (postDoc) {
            findFinalShareId();
        }
    }, [postDoc]);

    return finalShareId;
};

export default useGetFinalShareId;
