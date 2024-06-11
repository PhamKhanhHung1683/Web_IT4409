import { Flex, Image, Text, VStack, background } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './GameBar.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
const GameBar = () => {
    return (
        <Flex direction={'column'} w={'full'} alignItems={'flex-start'} mt={1}>
            <Text fontSize={'lg'} fontWeight={500} color={'gray'}>
                Games
            </Text>
            <Flex w={"full"}>
                <NavLink className={cx('item-wrapper')} to={"/game/xo"}>
                    <Flex h={'50px'} gap={2} p={2} alignItems={'center'}>
                        <Image h={'full'} src="/xo.jpg" borderRadius={'full'} />
                        <Text fontWeight={500}>Tic Tac Toe</Text>
                    </Flex>
                </NavLink>
            </Flex>
        </Flex>
    );
};

export default GameBar;
