import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "~/Firebase/Firebase";

const useFollowersList = (userId) => {
  const [isLoadings, setIsLoadings] = useState(false);
  const [followersList, setFollowersList] = useState([]);

  const getFollowersList = async () => {
    setIsLoadings(true);
    setFollowersList([]);
    try {
      const userDoc = await getDoc(doc(firestore, "users", userId));
      if (userDoc.exists()) {
        const followerIds = userDoc.data().follower || [];
        const followerUsers = [];
        for (const userId of followerIds) {
          const followerUserDoc = await getDoc(doc(firestore, "users", userId));
          if (followerUserDoc.exists()) {
            followerUsers.push({ uid: userId, ...followerUserDoc.data() });
          }
        }
        setFollowersList(followerUsers);
      }
    } catch (error) {
      console.error(error);
      setFollowersList([]);
    } finally {
      setIsLoadings(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getFollowersList();
    }
  }, [userId]);

  return { isLoadings, followersList };
};

export default useFollowersList;