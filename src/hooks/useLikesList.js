import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "~/Firebase/Firebase";

const useLikesList = (postId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likesList, setLikesList] = useState([]);

  const getLikesList = async () => {
    setIsLoading(true);
    setLikesList([]);
    try {
      const postDoc = await getDoc(doc(firestore, "posts", postId));
      if (postDoc.exists()) {
        const likesIds = postDoc.data().likes || [];
        const likesUsers = [];
        for (const userId of likesIds) {
          const userDoc = await getDoc(doc(firestore, "users", userId));
          if (userDoc.exists()) {
            likesUsers.push({ uid: userId, ...userDoc.data() });
          }
        }
        setLikesList(likesUsers);
      }
    } catch (error) {
      console.error(error);
      setLikesList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      getLikesList();
    }
  }, [postId]);

  return { isLoading, likesList };
};

export default useLikesList;
