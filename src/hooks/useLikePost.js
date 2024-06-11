import { useState, useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";

const useLikePost = (postId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(firestore, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const postData = postSnap.data();
        setLikes(postData.likes.length);
        setIsLiked(postData.likes.includes(authUser?.uid));
      }
    };

    fetchPost();
  }, [postId, authUser]);

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) return;
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", postId);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      // handle error
    } finally {
      setIsUpdating(false);
    }
  };

  return { likes, isLiked, handleLikePost };
};

export default useLikePost;