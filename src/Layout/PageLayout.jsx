import { Box, Flex, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Notification from '~/components/Notification/Notification';
import SideBar from '~/components/SideBar/SideBar';
import { ScreenContext } from '~/contexts/ScreenContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '~/Firebase/Firebase';
import GameBar from '~/components/GameBar/GameBar';
import useChatStore from '~/stores/chatStore';
import Chat from '~/components/Message/Chat';
const PageLayout = ({ children }) => {
    const { pathname } = useLocation();
    const { width } = useContext(ScreenContext);
    const [user] = useAuthState(auth);
    const { chatIds, pushId, deleteId, setChatIds } = useChatStore();
    return (
        <Flex w={'full'} bg={'rgba(0,255,0,0.03)'}>
            {pathname !== '/auth' && user && (
                <Box w={{ base: '60px', md: '240px' }}>
                    <SideBar />
                </Box>
            )}
            <Flex flex={1} gap={5} p={{ base: 1, md: 3 }}>
                <Box flex={1} display={'flex'} justifyContent={'center'}>
                    {children}
                </Box>
                {pathname !== '/auth' && user && (
                    <Box w={'340px'} display={width < 1000 ? 'none' : 'block'}>
                        <VStack position={'sticky'} top={2.5}>
                            <Notification />
                            <GameBar />
                        </VStack>
                    </Box>
                )}
                {user && chatIds && chatIds.length > 0 && <Chat />}
            </Flex>
        </Flex>
    );
};

export default PageLayout;
