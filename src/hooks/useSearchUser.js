import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "~/Firebase/Firebase";


const useSearchUser = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const getUserProfile = async (substring) => {
    setIsLoading(true);
    setUsers(null);
    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const matchingUsers = [];
      let count = 0;

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const lowerCaseName = data.name.toLowerCase();
        const lowerCaseNickname = data.nickname.toLowerCase();
        if (lowerCaseName.includes(substring) || lowerCaseNickname.includes(substring)) {
          matchingUsers.push({ id: doc.id, ...data });
          count++;
          if (count >= 20) {
            break; // Dừng vòng lặp khi đã có đủ 20 kết quả
          }
        }
      }
      setUsers(matchingUsers);
    } catch (error) {
      setUsers(null);
    } finally {
      setIsLoading(false);
    }



  }


  return { isLoading, getUserProfile, users, setUsers }

}
export default useSearchUser;