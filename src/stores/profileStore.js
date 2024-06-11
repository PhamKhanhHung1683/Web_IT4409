//save the profile of user that we go to
//localhost/profile/:nickname
import { create } from 'zustand';

const useProfileStore = create((set) => ({
    //   count: 1,
    //   inc: () => set((state) => ({ count: state.count + 1 })),
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
}));
export default useProfileStore;
