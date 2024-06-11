import { doc, updateDoc } from 'firebase/firestore';
import {useState} from 'react'
import { firestore } from '~/Firebase/Firebase';

const useUpdateComment = () => {
    const [loading,setLoading]=useState(false);

    const updateComment = async(id,editedValue)=>{
        setLoading(true)
        try {
            await updateDoc(doc(firestore,"comments",id),{
                comment:editedValue
            })
            
        } catch (error) {
            console.log("error when update comment",error);
        }
        finally{
            setLoading(false)
        }
    }
  return ({loading,updateComment}
  )
}

export default useUpdateComment
