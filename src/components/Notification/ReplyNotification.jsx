import { Avatar, Box, Flex, Text, useToast } from '@chakra-ui/react';
import React, { memo, useMemo } from 'react';
import useGetUserById from '~/hooks/useGetUserById';
import { getTimeDistance } from '~/assets/functions';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '~/Firebase/Firebase';
const ReplyNotification = ({ data }) => {
    const { isLoading, user } = useGetUserById(data.createdby);
    const navigate = useNavigate();
    const toast = useToast();

    const handlerDeleteNotification = async () => {
        try {
            await deleteDoc(doc(firestore, 'notifications', data.id));
        } catch (error) {
            toast({ title: 'Error on delete notification', description: error.message, status: 'error' });
        }
    };
    const handlerActive = () => {
        navigate(`/post/${data.postid}`);
    };
    const time = useMemo(() => {
        return getTimeDistance(data.createdat);
    }, [user]);
    return (
        <>
            {!isLoading && user && (
                <Box position={'relative'}>
                    <Flex
                        _hover={{ bg: 'blackAlpha.100' }}
                        _active={{ transform: 'scale(0.99)' }}
                        cursor={'pointer'}
                        p={{ base: 1, md: 2 }}
                        borderRadius={7}
                        gap={'5px'}
                        onClick={handlerActive}
                    >
                        <Avatar src={user.avatarimage} alt={user.name} />
                        <Flex gap={1} flex={1} direction={'column'} pr={'13px'}>
                            <Text lineHeight={1}>
                                <span style={{ fontSize: '17px', fontWeight: '500' }}>{`${user.name} `}</span>
                                reply your comment
                            </Text>
                            <Text>{data.content}</Text>
                            <Text fontSize={'md'}>{time}</Text>
                        </Flex>
                    </Flex>
                    <Box
                        _hover={{ transform: 'scale(1.2)' }}
                        _active={{ transform: 'scale(0.99)' }}
                        onClick={handlerDeleteNotification}
                        cursor={'pointer'}
                        height={'19px'}
                        width={'19px'}
                        position={'absolute'}
                        top={1.5}
                        right={1.5}
                    >
                        <IoCloseOutline style={{ width: '100%', height: '100%' }} />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default ReplyNotification;
