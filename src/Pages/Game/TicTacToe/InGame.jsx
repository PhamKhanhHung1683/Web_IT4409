import { Avatar, Box, Flex, Text,  useDisclosure } from '@chakra-ui/react';
import {  onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { realTimeDb } from '~/Firebase/Firebase';
import useGetUserById from '~/hooks/useGetUserById';
import useAuthStore from '~/stores/authStore';
import { RxReset } from 'react-icons/rx';
import { GrPowerReset } from 'react-icons/gr';
import { MdOutlinePersonAdd } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { FaRegCircle } from 'react-icons/fa';
import Invite from './Invite';
const InGame = () => {
    const { id } = useParams();
    const [game, setGame] = useState();
    const [canMove, setCanMove] = useState(true);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const checkWinner = () => {
        const { board } = game;
        let winner = '';
        let step = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] !== '') step++;
            }
        }
        if (step === 9) winner = 'Draw';
        for (let i = 0; i < 3; i++) {
            //row
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) winner = board[i][0];
            //col
            if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) winner = board[0][i];
        }
        if (board[0][0] !== '' && board[1][1] === board[0][0] && board[1][1] === board[2][2]) winner = board[0][0];
        if (board[2][0] !== '' && board[2][0] === board[1][1] && board[1][1] === board[0][2]) winner = board[2][0];

        return winner;
    };
    const [winner, setWinner] = useState('');
    const { user } = useAuthStore();
    const { user: opponent } = useGetUserById(game?.player1 === user.uid ? game?.player2 : game?.player1);

    const savemove = async (rowindex, colindex) => {
        const copy = { ...game };
        if (game.board[rowindex][colindex] === '') {
            copy.board[rowindex][colindex] = game.turn === game.first ? 'x' : 'o';
            copy.turn = game.turn === game.player1 ? game.player2 : game.player1;
            await set(ref(realTimeDb, '/xogames/' + id), copy);
        }
    };
    const reset = async () => {
        const ranNumber = Math.floor(Math.random() * 2);
        console.log('randnum', ranNumber);
        let first = user.uid;
        if (ranNumber === 0) {
            first = opponent.uid;
        }
        await set(ref(realTimeDb, `xogames/${id}`), {
            player1: user.uid,
            player2: opponent.uid,
            turn: first,
            first,
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ],
            reset: true,
        });
    };
    const back = async () => {
        const copy = { ...game };
        if (user.uid === game.player1) {
            copy.player1 = '';
        } else copy.player2 = '';
        await set(ref(realTimeDb, 'xogames/' + id), copy);
        navigate('/game/xo');
    };
    useEffect(() => {
        if (game) {
            console.log('game', game);
            let winner = checkWinner();
            if (winner) {
                if (winner === 'x') {
                    //first win
                    if (user.uid === game.first) {
                        setWinner('You win!!');
                    } else {
                        setWinner('You lose!!');
                    }
                } else if (winner === 'o') {
                    if (user.uid === game.first) {
                        setWinner('You lose!!');
                    } else {
                        setWinner('You win!!');
                    }
                } else {
                    setWinner('Draw');
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game]);
    useEffect(() => {
        const unsubcribe = onValue(ref(realTimeDb, `xogames/${id}`), (snapShot) => {
            const data = snapShot.val();
            setCanMove(data.turn === user.uid);
            console.log('turn: ', data.turn);
            console.log('user: ', user.uid);
            if (data.reset === true) {
                setWinner('');
                const copy = { ...data };
                copy.reset = false;
                set(ref(realTimeDb, 'xogames/' + id), copy);
            }
            setGame(data);
        });

        return () => {
            unsubcribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <>
            {game && (
                <Flex direction={'column'} h={'100vh'} justifyContent={'center'} gap={3}>
                    {/* back */}
                    <Box
                        w={'27px'}
                        padding={1}
                        borderRadius={6}
                        cursor={'pointer'}
                        _hover={{ bg: 'blackAlpha.100' }}
                        _active={{ bg: 'blackAlpha.200' }}
                        onClick={back}
                    >
                        <RxReset />
                    </Box>
                    {/* opponent */}
                    {opponent && (
                        <Flex gap={1}>
                            <Avatar
                                src={opponent.avatarimage}
                                animation={opponent.uid === game.turn && 'xo_current 2s infinite'}
                            />
                            <Text fontWeight={500}>{opponent.name}</Text>
                        </Flex>
                    )}
                    {!opponent && (
                        <Flex gap={1}>
                            <Box
                                w={'45px'}
                                height="45px"
                                background={'blackAlpha.100'}
                                cursor={'pointer'}
                                _hover={{ bg: 'blackAlpha.200' }}
                                _active={{ bg: 'blackAlpha.300' }}
                                p={2}
                                borderRadius={'full'}
                                onClick={onOpen}
                            >
                                <MdOutlinePersonAdd size={'full'} />
                            </Box>
                            <Text>Waitting for your opponent...</Text>
                        </Flex>
                    )}
                    <Flex direction={'column'} border={'1px solid blue'} position={'relative'}>
                        {game.board.map((row, rowindex) => (
                            <Flex key={rowindex}>
                                {row.map((col, colIndex) => (
                                    <Flex
                                        border={'1px solid blue'}
                                        width={'100px'}
                                        height="100px"
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        cursor={canMove ? 'pointer' : 'no-drop'}
                                        onClick={() => {
                                            if (canMove) savemove(rowindex, colIndex);
                                        }}
                                        _hover={{ bg: canMove && 'blackAlpha.200' }}
                                    >
                                        {col === 'x' ? (
                                            <IoClose style={{ width: '90%', height: '90%' }} />
                                        ) : col === 'o' ? (
                                            <FaRegCircle style={{ width: '74%', height: '74%' }} />
                                        ) : (
                                            ''
                                        )}
                                    </Flex>
                                ))}
                            </Flex>
                        ))}
                        {winner && (
                            <Text
                                position="absolute"
                                transform={'translateX(-50%) translateY(-50%)'}
                                top={'50%'}
                                left="50%"
                                fontWeight={700}
                                fontSize={'3xl'}
                                color={winner === 'You win!!' ? 'green' : 'red'}
                                animation={'winner 3s infinite'}
                                bg={'whiteAlpha.700'}
                                padding={1}
                                borderRadius={3}
                            >
                                {winner}
                            </Text>
                        )}
                    </Flex>
                    <Flex>
                        <Box
                            h={'32px'}
                            borderRadius={'6px'}
                            _hover={{ bg: 'blackAlpha.100' }}
                            _active={{ bg: 'blackAlpha.200' }}
                            cursor={'pointer'}
                            padding={'6px'}
                            onClick={reset}
                        >
                            <GrPowerReset />
                        </Box>
                    </Flex>
                    {/* me */}
                    {user && (
                        <Flex gap={1} justifyContent={'flex-end'}>
                            <Text fontWeight={500}>{user.name}</Text>
                            <Avatar
                                src={user.avatarimage}
                                animation={user.uid === game.turn && 'xo_current 0.5s infinite'}
                            />
                        </Flex>
                    )}
                </Flex>
            )}
            <Invite isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default InGame;
