import { create } from 'zustand'

const UsePostStore = create((set) => ({
//   count: 1,
//   inc: () => set((state) => ({ count: state.count + 1 })),
postlist:[],
setpostlist:(postlist)=>set({postlist}),
addposts:(posts)=>set(state=>({postlist:[...state.postlist,...posts]})),
}))
export default UsePostStore

