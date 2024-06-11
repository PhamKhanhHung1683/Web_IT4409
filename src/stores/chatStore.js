import { create } from 'zustand';

const useChatStore = create((set) => ({
    //   count: 1,
    //   inc: () => set((state) => ({ count: state.count + 1 })),
    chatIds: JSON.parse(localStorage.getItem('chatids')) || [],
    pushId: (id) =>
        set((state) => {
            if (state.chatIds.includes(id)) return { chatIds: state.chatIds };
            else {
                const newChatIds = [...state.chatIds, id];
                localStorage.setItem('chatids', JSON.stringify(newChatIds));
                return { chatIds: newChatIds };
            }
        }),
    deleteId: (deletedId) =>
        set((state) => {
            const newChatIds = state.chatIds.filter((id) => id !== deletedId);
            localStorage.setItem('chatids', JSON.stringify(newChatIds));
            return { chatIds: newChatIds };
        }),
    setChatIds: (chatIds) => {
        set({ chatIds });
        localStorage.setItem('chatids', JSON.stringify(chatIds));
    },
    select: (index) => {
        set((state) => {
            const newChatIds = state.chatIds;
            const top = newChatIds[newChatIds.length - 1];
            newChatIds[newChatIds.length - 1] = newChatIds[index];
            newChatIds[index] = top;
            localStorage.setItem('chatids', JSON.stringify(newChatIds));
            return { chatIds: newChatIds };
        });
    },
}));
export default useChatStore;
