import React, { memo } from 'react';
import { Avatar, Flex, Text, useToast } from '@chakra-ui/react';
import useAuthStore from '~/stores/authStore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '~/Firebase/Firebase';
import useChatStore from '~/stores/chatStore';

const SearchItem = ({ userDoc }) => {
    const toast = useToast();
    const { user } = useAuthStore();
    const { deleteId, pushId, chatIds } = useChatStore();
    const onClick = async () => {
        try {
            const combinedid = user.uid > userDoc.uid ? user.uid + userDoc.uid : userDoc.uid + user.uid;
            //get chat
            const chatSnapShot = await getDoc(doc(firestore, 'chats', combinedid));
            if (!chatSnapShot.exists()) {
                //create chats
                setDoc(doc(firestore, 'chats', combinedid), {
                    messages: [],
                });
                //create userchats
                let temp = await getDoc(doc(firestore, 'userchats', user.uid));
                if (!temp.exists()) setDoc(doc(firestore, 'userchats', user.uid), {});
                updateDoc(doc(firestore, 'userchats', user.uid), {
                    [combinedid + '.userinfo']: {
                        uid: userDoc.uid,
                        avatarimage: userDoc.avatarimage,
                        name: userDoc.name,
                        nickname: userDoc.nickname,
                    },
                    [combinedid + '.lastmessage']: {},
                    [combinedid + '.date']: Date.now(),
                });
                temp = await getDoc(doc(firestore, 'userchats', userDoc.uid));
                if (!temp.exists()) setDoc(doc(firestore, 'userchats', userDoc.uid), {});
                updateDoc(doc(firestore, 'userchats', userDoc.uid), {
                    [combinedid + '.userinfo']: {
                        uid: user.uid,
                        avatarimage: user.avatarimage,
                        name: user.name,
                        nickname: user.nickname,
                    },
                    [combinedid + '.lastmessage']: {},
                    [combinedid + '.date']: Date.now(),
                });
            }
            pushId(combinedid);
        } catch (error) {}
    };
    return (
        <Flex
            onClick={onClick}
            position={'relative'}
            w={'full'}
            gap={2}
            py={3}
            px={2}
            borderRadius={'10px'}
            _hover={{ bg: 'blackAlpha.100' }}
            cursor={'pointer'}
            _active={{ transform: 'scale(0.99)' }}
            alignItems={'center'}
        >
            <Avatar src={userDoc.avatarimage || '/noImage.jpg'} alt={userDoc.name} />
            <Text lineHeight={1} fontSize={'lg'} color={'rgb(0,0,0)'}>
                {userDoc.name}
            </Text>
        </Flex>
    );
};

export default memo(SearchItem);
