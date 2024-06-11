import { useToast } from '@chakra-ui/react';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '~/Firebase/Firebase';
import useAuthStore from '~/stores/authStore';
const useSendComment = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuthStore();
    const toast = useToast();
    const sendComment = async (comment, postid, userid, parent, reply) => {
  

        if (loading) return;
        setLoading(true);

        try {
            const docref = await addDoc(collection(firestore, 'comments'), {
                postid,
                createdby: user.uid,
                parent,
                comment,
                createdat: Date.now(),
                child: [],
            });
            if (!parent) {
                //add comment to post
                await updateDoc(doc(firestore, 'posts', postid), {
                    comments: arrayUnion(docref.id),
                });
            } else {
                await updateDoc(doc(firestore, 'comments', parent), {
                    child: arrayUnion(docref.id),
                });
            }
            if (userid !== user.uid) {
                await addDoc(collection(firestore, 'notifications'), {
                    type: 'comment',
                    content: comment,
                    createdat: Date.now(),
                    createdby: user.uid,
                    to: userid,
                    postid,
                });
            }
            if (reply!==user.uid) {
                await addDoc(collection(firestore, 'notifications'), {
                    type: 'reply',
                    content: comment,
                    createdat: Date.now(),
                    createdby: user.uid,
                    to: reply,
                    postid,
                });
            }
        } catch (error) {
            toast({ title: 'Error', description: error.message, status: 'error' });
        } finally {
            setLoading(false);
        }
    };
    return { loading, sendComment };
};

export default useSendComment;
