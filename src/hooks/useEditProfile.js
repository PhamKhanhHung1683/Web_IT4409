import { useToast } from '@chakra-ui/react';
import useAuthStore from '../stores/authStore';
import {  getDownloadURL, ref, uploadString } from "firebase/storage";
import {firestore, storage}from'../Firebase/Firebase'
import { doc, updateDoc } from 'firebase/firestore';
import useProfileStore from '../stores/profileStore'
import { useState } from 'react';
const useEditProfile = () => {
    const [isUpdating,setIsUpdating]=useState(false);
    const toast = useToast();
    const user = useAuthStore(state=>state.user)
    const setUser = useAuthStore(state=>state.setUser)
    const setUserProfile = useProfileStore(state=>state.setUserProfile)
    
    const editProfile =async (inputs,backgroundImage,avatarImage,birthday)=>{
        if(isUpdating)return;
        setIsUpdating(true);
        const backgroundRef = ref(storage,`backgroundImage/${user.uid}`);
        const avatarRef = ref(storage,`avatarImage/${user.uid}`);
        const userDocRef = doc(firestore,"users",user.uid);
        let URLBackground = "";
        let URLAvatar="";
        try {
            if(backgroundImage){
                await uploadString(backgroundRef, backgroundImage,"data_url");
             URLBackground= await getDownloadURL(backgroundRef);
            }
           if(avatarImage){
            await uploadString(avatarRef,avatarImage,"data_url");
            URLAvatar = await getDownloadURL(avatarRef);
           }
            const updateUserDoc = {...user,...inputs,avatarimage:URLAvatar||user.avatarimage,backgroundimage:URLBackground||user.backgroundimage,birthday};
            await updateDoc(userDocRef,updateUserDoc);
            setUser(updateUserDoc);
            setUserProfile(updateUserDoc)
            localStorage.setItem('user-info',JSON.stringify(updateUserDoc));


        } catch (error) {
            toast({title:"Error when upload",description:error.message,status:"error"});
        }
    }
  return ({isUpdating,editProfile}
  )
}

export default useEditProfile
