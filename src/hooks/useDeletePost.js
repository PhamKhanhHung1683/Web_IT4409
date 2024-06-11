import { deleteDoc, doc, getDoc, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { firestore, storage } from '~/Firebase/Firebase';
import useDeleteComment from './useDeleteComment';

const useDeletePost = () => {
    const [deletePostLoading, setDeleteLoading] = useState(false);
    const { deleteLoading, deleteComment } = useDeleteComment();
    const deletePost = async (post) => {
        setDeleteLoading(true);
        const { id, comments, imgurl } = post;
        try {
            //delete image
            if (imgurl) {
                const imageRef = ref(storage, `posts/${id}`);
                await deleteObject(imageRef);
            }

            //delete comment
            const batch = writeBatch(firestore);
            for (let i = 0; i < comments.length; i++) {
                await deleteComment(comments[i], batch);
            }
            await batch.commit();
            //delte post
            deleteDoc(doc(firestore, 'posts', id));
        } catch (error) {
            console.log('error delete psot', error);
        } finally {
            setDeleteLoading(false);
        }
    };
    return { deletePostLoading, deletePost };
};

export default useDeletePost;
