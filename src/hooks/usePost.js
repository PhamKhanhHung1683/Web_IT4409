import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { storage, firestore } from '../Firebase/Firebase';
import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useAuthStore from '../stores/authStore';
const usePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);

    const newPost = async (input, image = null, shareId) => {
        if (isLoading) return;
        setIsLoading(true);
        let url = '';
        const userDoc = doc(firestore, 'users', user.uid);
        try {
            const postDoc = {
                caption: input,
                imgurl: '',
                likes: [],
                comments: [],
                createdat: Date.now(),
                createdby: user.uid,
                share: shareId ? shareId : '',
            };
            const ret = await addDoc(collection(firestore, 'posts'), postDoc);

            if (image) {
                const imageRef = ref(storage, `posts/${ret.id}`);
                await uploadString(imageRef, image, 'data_url');
                url = await getDownloadURL(imageRef);
            }
            await updateDoc(doc(firestore, 'posts', ret.id), {
                imgurl: url,
            });
            toast({ title: 'Posted successfully', status: 'success' });
        } catch (error) {
            toast({ title: 'Error', description: error.message, status: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
    const isValidDataUrl = (url) => {
        const regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/;
        return regex.test(url);
    };
    const editPost = async (id, input, image = null) => {
        if (isLoading) return;
        setIsLoading(true);
        let url = '';
        try {
            if (image && isValidDataUrl(image)) {
                const imageRef = ref(storage, `posts/${id}`);
                await uploadString(imageRef, image, 'data_url');
                url = await getDownloadURL(imageRef);
            } else if (image) {
                url = image; // If image is not a data URL, use it as is
            }
            await updateDoc(doc(firestore, 'posts', id), {
                caption: input,
                imgurl: url,
            });
        } catch (error) {
            toast({ title: 'Error', description: error.message, status: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        newPost,
        editPost,
    };
};

export default usePost;
