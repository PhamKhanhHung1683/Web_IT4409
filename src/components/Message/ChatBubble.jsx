import { Avatar, Box, Spinner } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { memo, useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { firestore } from '~/Firebase/Firebase';
import useAuthStore from '~/stores/authStore';
import useChatStore from '~/stores/chatStore';

const ChatBubble = ({ id, index }) => {
    const { user } = useAuthStore();
    const [friend, setFriend] = useState();
    const { deleteId, select } = useChatStore();
    useEffect(() => {
        const getUserChat = async () => {
            const snapShot = await getDoc(doc(firestore, 'userchats', user.uid));
            setFriend(snapShot.data()[id].userinfo);
        };
        getUserChat();
    }, [id]);
    return (
        <Box position={'relative'}>
            {friend && (
                <Avatar
                    src={friend.avatarimage || '/noimage.jpg'}
                    boxShadow={'1px 1px 10px rgba(0,0,0,0.24)'}
                    _hover={{ transform: 'scale(1.1)' }}
                    _active={{ transform: 'scale(0.99)' }}
                    cursor={'pointer'}
                    onClick={() => {
                        select(index);
                    }}
                />
            )}
            {!friend && <Spinner />}

            <Box
                cursor={'pointer'}
                _active={{ transform: 'scale(0.99)' }}
                _hover={{ transform: 'scale(1.1)' }}
                position={'absolute'}
                top={0}
                right={0}
                w={'15px'}
                p={'1px'}
                borderRadius={'30px'}
                bg={'white'}
                boxShadow={'1px 1px 10px rgba(0,0,0,0.24)'}
                onClick={() => deleteId(id)}
            >
                <IoCloseOutline size={'full'} />
            </Box>
        </Box>
    );
};

export default ChatBubble;
