import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { child, push, ref, set, getDatabase, query, get, update } from 'firebase/database';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { realTimeDb } from '~/Firebase/Firebase';
import useAuthStore from '~/stores/authStore';
const TicTacToe = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [joinInput, setJoinInput] = useState('');
    const toast = useToast();
    const onCreate = async () => {
        console.log('create');
        const xogamesRef = ref(realTimeDb, 'xogames');
        const newgameRef = push(xogamesRef);
        await set(newgameRef, {
            player1: user.uid,
            player2: '',
            turn: user.uid,
            first: user.uid,
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            reset: false,
        });
        navigate(`/game/xo/${newgameRef.key}`);
    };
    const onJoin = () => {
        console.log('input', joinInput);
        get(ref(realTimeDb, `xogames/${joinInput}`)).then(async (snapshot) => {
            if (!snapshot.exists()) {
                toast({ title: 'Not found', status: 'error' });
                return;
            }
            if (snapshot.val().player2 === '') {
                const updates = {};
                updates['/xogames/' + joinInput + '/player2'] = user.uid;
                await update(ref(realTimeDb), updates);
                navigate(`/game/xo/${joinInput}`);
                return;
            }
            if (snapshot.val().player1 === '') {
                const updates = {};
                updates['/xogames/' + joinInput + '/player1'] = user.uid;
                await update(ref(realTimeDb), updates);
                navigate(`/game/xo/${joinInput}`);
                return;
            }
            toast({ title: 'Game started!', status: 'error' });
            return;
        });
    };
    return (
        <Flex direction={'column'} w={'90%'}>
            <Text textAlign={'center'} fontSize={'5xl'} fontWeight={'700'} fontFamily={"'Dancing Script', cursive"}>
                Tic Tac Toe
            </Text>
            <Image alignSelf={'center'} w={'70%'} src="/tictactoe.png" />
            <Flex w={'full'} flex={1} alignItems={'center'} justifyContent={'center'} gap={10} p={2}>
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100px'}
                    height={'100px'}
                    bg={'rgba(255,0,0,0.5)'}
                    cursor={'pointer'}
                    _hover={{ transform: 'scale(1.1)' }}
                    onClick={onCreate}
                    fontWeight={700}
                >
                    Create
                </Flex>
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'100px'}
                    height={'100px'}
                    bg={'rgba(0,0,255,0.5)'}
                    cursor={'pointer'}
                    _hover={{ transform: 'scale(1.1)' }}
                    onClick={onOpen}
                    fontWeight={700}
                >
                    Join
                </Flex>
            </Flex>

            {/* modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Join Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input placeholder="Room Id" value={joinInput} onChange={(e) => setJoinInput(e.target.value)} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onJoin}>
                            Join
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default TicTacToe;
