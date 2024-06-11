import { collection, getDocs, doc, getDoc, query, limit } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "~/Firebase/Firebase";
import useAuthStore from '../stores/authStore';

const useSuggestUsers = () => {
  const user = useAuthStore(state => state.user);
  let userId = null;
  if (user && user.uid) {
    userId = user.uid;
  }
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const getSuggestUsers = async () => {
    setIsLoading(true);
    setUsers(null);
    try {
      const userDoc = await getDoc(doc(firestore, "users", userId));
      const followingIds = userDoc.data().following;
      const suggestUsers = [];

      if (followingIds.length === 0) {
        // Trường hợp followingIds rỗng, lấy ngẫu nhiên 5 người dùng từ cơ sở dữ liệu
        const randomUsersQuery = query(collection(firestore, "users"), limit(5));
        const randomUsersSnapshot = await getDocs(randomUsersQuery);
        randomUsersSnapshot.forEach(doc => {
          const data = doc.data();
          if (doc.id !== userId) {
            suggestUsers.push({ uid: doc.id, ...data });
          }
        });
      } else {
        // Trường hợp followingIds không rỗng, thực hiện logic gợi ý như trước
        for (const id of followingIds) {
          const followingDoc = await getDoc(doc(firestore, "users", id));
          if (followingDoc.exists()) {
            const data = followingDoc.data();
            const followingFollowing = data.following;
            for (const followingId of followingFollowing) {
              if (followingId !== userId && !followingIds.includes(followingId) && !suggestUsers.some(user => user.uid === followingId)) {
                const followingDoc = await getDoc(doc(firestore, "users", followingId));
                if (followingDoc.exists()) {
                  const followingData = followingDoc.data();
                  suggestUsers.push({ uid: followingId, ...followingData });
                }
              }
            }
          }
        }
      }

      setUsers(suggestUsers);
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, users, getSuggestUsers };
};

export default useSuggestUsers;
