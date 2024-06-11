import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "~/Firebase/Firebase";

const useFollowingsList = (userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [followingsList, setFollowingsList] = useState([]);

  const getFollowingsList = async () => {
    setIsLoading(true);
    setFollowingsList([]);
    try {
      const userDoc = await getDoc(doc(firestore, "users", userId));
      if (userDoc.exists()) {
        const followingIds = userDoc.data().following || [];
        const followingUsers = [];
        for (const userId of followingIds) {
          const followingUserDoc = await getDoc(doc(firestore, "users", userId));
          if (followingUserDoc.exists()) {
            followingUsers.push({ uid: userId, ...followingUserDoc.data() });
          }
        }
        setFollowingsList(followingUsers);
      }
    } catch (error) {
      console.error(error);
      setFollowingsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getFollowingsList();
    }
  }, [userId]);

  return { isLoading, followingsList };
};

export default useFollowingsList;