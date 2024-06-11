import { create } from 'zustand'

const useAuthStore = create((set) => ({
//   count: 1,
//   inc: () => set((state) => ({ count: state.count + 1 })),
user:JSON.parse(localStorage.getItem('user-info')),
login:(user)=>set(state=>({...state,user})),
logout:()=>set(state=>({...state,user:null})),
setUser:(user)=>set(state=>({...state,user})),
unsubcribe:null,
setunsubcribe:(unsub)=>set(state=>({...state,unsubcribe:unsub}))
}))
export default useAuthStore

