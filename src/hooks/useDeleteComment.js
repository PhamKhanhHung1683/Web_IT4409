import { arrayRemove, doc, getDoc, writeBatch } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '~/Firebase/Firebase';

const useDeleteComment = () => {
    const [deleteLoading, setDeleteLoading] = useState(false);

    const deleteComment = async (id, batch) => {
        console.log('delteComennt', id);

        if (id) {
            const commentSnapShot = await getDoc(doc(firestore, 'comments', id));
            const { child, parent, postid } = commentSnapShot.data();
            console.log('child', child);
            for (let i = 0; i < child.length; i++) {
                await deleteComment(child[i], batch);
            }
            if (parent) {
                batch.update(doc(firestore, 'comments', parent), {
                    child: arrayRemove(id),
                });
            } else {
                batch.update(doc(firestore, 'posts', postid), {
                    comments: arrayRemove(id),
                });
            }
            batch.delete(doc(firestore, 'comments', id));
        }
    };
    const handlerDeleteComment = async (id) => {
        console.log('handlerdeletecomment', 'callfunciton');
        setDeleteLoading(true);
        try {
            const batch = writeBatch(firestore);
            await deleteComment(id, batch);
            await batch.commit();
        } catch (error) {
            console.log('error delete comment', error);
        } finally {
            setDeleteLoading(false);
        }
    };
    return { deleteLoading, deleteComment, handlerDeleteComment };
};

export default useDeleteComment;
