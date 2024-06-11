import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Input,
    Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DrawerChatItem from './DrawerChatItem';
import SearchItem from './SearchItem';
import { useDebounce } from '~/hooks';
import useSearchUser from '~/hooks/useSearchUser';
import { doc, onSnapshot } from 'firebase/firestore';
import useAuthStore from '~/stores/authStore';
import { firestore } from '~/Firebase/Firebase';

const MessageDrawer = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const debounceValue = useDebounce(input, 200);
    const { isLoading, getUserProfile, users, setUsers } = useSearchUser();
    const { user } = useAuthStore();
    useEffect(() => {
        getUserProfile(debounceValue);
    }, [debounceValue]);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        let unsub;
        const getUserChat = () => {
            unsub = onSnapshot(doc(firestore, 'userchats', user.uid), (snapShot) => {
                setChats(snapShot.data());
            });
        };
        getUserChat();
        return () => {
            unsub();
        };
    }, []);
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={{ base: 'full', md: 'sm' }}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Message</DrawerHeader>

                <DrawerBody display={'flex'} flexDirection={'column'}>
                    <Input placeholder="Search " value={input} onChange={(e) => setInput(e.target.value)} />
                    {input.length > 0 ? (
                        <Flex w={'full'} direction={'column'} mt={3} gap={1} flex={1} overflowY={'scroll'}>
                            {!isLoading &&
                                users &&
                                users.map((user) => {
                                    return <SearchItem key={user.uid} userDoc={user} />;
                                })}
                            {isLoading && (
                                <Flex align="center" justify="center" height="100%">
                                    <Spinner color="red.500" />
                                </Flex>
                            )}
                        </Flex>
                    ) : (
                        <Flex w={'full'} direction={'column'} mt={3} gap={1} flex={1} overflowY={'scroll'}>
                            {chats &&
                                Object.entries(chats).map((element) => (
                                    <DrawerChatItem
                                        key={element[0]}
                                        userinfo={element[1].userinfo}
                                        date={element[1].date}
                                        message={element[1].lastmessage}
                                    />
                                ))}
                        </Flex>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default MessageDrawer;
