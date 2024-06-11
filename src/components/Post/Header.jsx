import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import FollowButton from './FollowButton';
import useAuthStore from '~/stores/authStore';
import useDeletePost from '~/hooks/useDeletePost';
import { getTimeDistance } from '~/assets/functions';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '~/Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

const Header = ({ postDoc, setIsEditing }) => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [ownPost, setOwnPost] = useState(false);
    const { deletePost } = useDeletePost();
    const [userDoc, setUserDoc] = useState();
    useEffect(() => {
        let unsubcribe;
        if (postDoc) {
            unsubcribe = onSnapshot(doc(firestore, 'users', postDoc.createdby), (snapShot) => {
                console.log('snapshot', snapShot.data());
                setUserDoc(snapShot.data());
            });
        }
        return () => {
            unsubcribe();
        };
    }, [postDoc]);
    useEffect(() => {
        if (user && userDoc) {
            setOwnPost(user?.uid === postDoc?.createdby);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, userDoc]);

    return (
        <>
            {userDoc && (
                <Flex gap={{ base: 1, md: 2 }} alignItems={'flex-start'} px={{ base: 1, md: 2 }} py={2}>
                    <Avatar
                        cursor={'pointer'}
                        _hover={{ transform: 'scale(1.01)' }}
                        src={userDoc && userDoc.avatarimage ? userDoc.avatarimage : '/noimage.jpg'}
                        size={{ base: 'sm', md: 'md' }}
                        alt={'avatar'}
                        onClick={() => {
                            navigate(`/profile/${userDoc.nickname}`);
                        }}
                    />
                    <Flex flex={1} direction={'column'}>
                        <Text
                            fontWeight={'600'}
                            fontSize={{ base: 'sm', md: 'lg' }}
                            _hover={{ textDecoration: 'underline' }}
                            cursor={'pointer'}
                            onClick={() => {
                                navigate(`/profile/${userDoc.nickname}`);
                            }}
                        >
                            {userDoc?.name}
                        </Text>
                        <Text mt={-1} color={'gray.800'}>
                            {getTimeDistance(postDoc.createdat)}
                        </Text>
                    </Flex>
                    {ownPost ? (
                        <Menu>
                            <MenuButton
                                w={'30px'}
                                p={1}
                                borderRadius={'full'}
                                cursor={'pointer'}
                                _hover={{ bg: 'blackAlpha.200' }}
                                _active={{ transform: 'scale(0.9)' }}
                            >
                                <HiDotsHorizontal size={'100%'} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setIsEditing(true)}>Edit</MenuItem>
                                <MenuItem color={'red'} onClick={() => deletePost(postDoc)}>
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <FollowButton userDoc={userDoc} />
                    )}
                </Flex>
            )}
        </>
    );
};

export default Header;
