import React, { memo, useContext } from 'react';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineExplore } from 'react-icons/md';
import { BsLightningChargeFill } from 'react-icons/bs';
import { TbLogout2 } from 'react-icons/tb';
import { BiHomeAlt2 } from 'react-icons/bi';
import { Avatar, Box, Flex, Link, Text, Tooltip, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { ScreenContext } from '~/contexts/ScreenContext';
import useLogout from '~/hooks/useLogout';
import useAuthStore from '~/stores/authStore';
import Home from './Home';
import Search from './Search';
import Explore from './Explore';
import Create from './Create';
import Message from './Message';
const SideBar = () => {
    const user = useAuthStore((state) => state.user);

    const { height, width } = useContext(ScreenContext);
    const SideBarItems = [
        {
            icon: <MdOutlineExplore size={width < 400 ? 22 : 33} />,
            text: 'Explore', //move to explore page have some post
        },
        {
            icon: <BsLightningChargeFill size={width < 400 ? 22 : 33} />,
            text: 'Create',
        },
        {
            icon: (
                <Avatar
                    name="Dan Abrahmov"
                    size={'sm'}
                    src={user && user.avatarimage !== '' ? user.avatarimage : '/avatar.jpg'}
                />
            ),
            text: user && user.name,
            bold: 'bold',
            link: `/profile/${user && user.nickname}`,
        },
    ];
    const { handlerSignout } = useLogout();
    return (
        <VStack
            // borderRight={'1px solid gray'}
            position={'Sticky'}
            top={0}
            left={0}
            display={'flex'}
            p={{ base: 2, md: 4 }}
            alignItems={'stretch'}
            h={height + 'px'}
        >
            <Logo sm responsive />
            <Flex direction={'column'} gap={1} mt={4}>
                <Home width={width} />
                <Search width={width} />
                <Explore width={width} />
                <Message width={width} />
                <Create width={width} />

                <Tooltip hasArrow placement="right" label={user?.name} display={{ base: 'block', md: 'none' }}>
                    <Link
                        _active={{ transform: 'scale(1.2)' }}
                        display={'flex'}
                        gap={2}
                        alignItems={'center'}
                        as={RouterLink}
                        justifyContent={{ base: 'center', md: 'flex-start' }}
                        borderRadius={6}
                        padding={{ base: 1, md: 3 }}
                        to={`/profile/${user && user.nickname}`}
                        _hover={{ bg: 'blackAlpha.200' }}
                    >
                        {
                            <Avatar
                                name="Dan Abrahmov"
                                size={'sm'}
                                src={user && user.avatarimage !== '' ? user.avatarimage : '/avatar.jpg'}
                            />
                        }
                        <Text fontWeight={'bold'} display={{ base: 'none', md: 'block' }}>
                            {user?.name}
                        </Text>
                    </Link>
                </Tooltip>
            </Flex>
            <Box flex={1}></Box>
            <Flex
                onClick={handlerSignout}
                gap={2}
                cursor={'pointer'}
                alignItems={'center'}
                justifyContent={{ base: 'center', md: 'stretch' }}
                borderRadius={4}
                padding={{ base: 1, md: 3 }}
                _hover={{ bg: 'blackAlpha.200' }}
            >
                <TbLogout2 size={width < 400 ? '22px' : '33px'} />
                <Text display={{ base: 'none', md: 'block' }}>Log out</Text>
            </Flex>
        </VStack>
    );
};

export default memo(SideBar);
