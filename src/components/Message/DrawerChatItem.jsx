import { Avatar, Flex, Text } from '@chakra-ui/react';
import { memo, useState } from 'react';
import { getTimeDistance } from '~/assets/functions';
import useAuthStore from '~/stores/authStore';
import useChatStore from '~/stores/chatStore';

const DrawerChatItem = ({ userinfo, message, date, key }) => {
    const { deleteId, pushId, chatIds } = useChatStore();
    const { user } = useAuthStore();
    const onClick = () => {
        const combinedid = user.uid > userinfo.uid ? user.uid + userinfo.uid : userinfo.uid + user.uid;
        pushId(combinedid);
    };
    return (
        <Flex
            position={'relative'}
            w={'full'}
            gap={2}
            py={4}
            px={3}
            borderRadius={'10px'}
            _hover={{ bg: 'blackAlpha.100' }}
            cursor={'pointer'}
            _active={{ transform: 'scale(0.99)' }}
            onClick={onClick}
        >
            <Avatar src={userinfo.avatarimage || '/noImage.jpg'} alt={userinfo.name} />
            <Flex direction={'column'} h={'full'} justifyContent={'center'}>
                <Text lineHeight={1} fontWeight={600} fontSize={'lg'} color={'rgb(0,0,0)'}>
                    {userinfo.name}
                </Text>
                {message && (
                    <>
                        {' '}
                        <Text>{message.content && message.content} </Text>
                        <Text>{!message.content && message.imageurl && 'Sent an image'}</Text>
                    </>
                )}
            </Flex>
            <Text position={'absolute'} top={3} right={3}>
                {getTimeDistance(date)}
            </Text>
        </Flex>
    );
};

export default memo(DrawerChatItem);
