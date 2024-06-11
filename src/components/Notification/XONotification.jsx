import { Avatar, Box, Flex, Text, useToast } from '@chakra-ui/react';
import { get, ref, set } from 'firebase/database';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useMemo } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { firestore, realTimeDb } from '~/Firebase/Firebase';
import { getTimeDistance } from '~/assets/functions';
import useGetUserById from '~/hooks/useGetUserById';
import useAuthStore from '~/stores/authStore';

const XONotification = ({ data }) => {
    const { isLoading, user } = useGetUserById(data.createdby);
    const navigate = useNavigate();
    const toast = useToast();
    const { user: currentUser } = useAuthStore();
    const handlerDeleteNotification = async () => {
        try {
            await deleteDoc(doc(firestore, 'notifications', data.id));
        } catch (error) {
            toast({ title: 'Error on delete notification', description: error.message, status: 'error' });
        }
    };
    const handlerActive = async () => {
        const snapshot = await get(ref(realTimeDb, 'xogames/' + data.postid));
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const game = snapshot.val();
            if (game.player1 === '' && game.player2 !== currentUser.uid) {
                game.player1 = currentUser.uid;
                set(ref(realTimeDb, 'xogames/' + data.postid), game);
                navigate('game/xo/' + data.postid);
                return;
            }
            if (game.player2 === '' && game.player1 !== currentUser.uid) {
                game.player2 = currentUser.uid;
                set(ref(realTimeDb, 'xogames/' + data.postid), game);
                navigate('game/xo/' + data.postid);
                return;
            }
            toast({ title: 'Game started or ended!!', status: 'info' });
        }
    };
    const time = useMemo(() => {
        return getTimeDistance(data.createdat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                invited you to play x/o with code:
                                <br />
                                <span style={{ lineHeight: '1.2' }}> {data.postid}</span>
                            </Text>
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

export default XONotification;
