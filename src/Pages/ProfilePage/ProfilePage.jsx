import { Box, Button, Flex, Image, Link, Skeleton, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '~/assets/constant';
import { FormatDate } from '~/assets/functions';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Post from '~/components/Post/Post';
import ProfileForm from './ProfileForm';
import useGetProfileByNickname from '~/hooks/useGetProfileByNickname';
import { useParams } from 'react-router-dom';
import useAuthStore from '~/stores/authStore';
import useFetchProfilePost from '~/hooks/useFetchProfilePost';
import useFollow from '../../hooks/useFollow';
import { FiMapPin } from 'react-icons/fi';
import { CgWebsite } from 'react-icons/cg';
const ProfilePage = () => {
    //the code to style for responsive
    useEffect(() => {
        setElementWidth(document.getElementById('container_profile').clientWidth);
        const resizeHandler = () => {
            console.log('container_profile', document.getElementById('container_profile').clientWidth);
            setElementWidth(document.getElementById('container_profile').clientWidth);
        };
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    //some data
    const [elementWidth, setElementWidth] = useState(200);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { nickname } = useParams();

    const { user } = useAuthStore();
    const isOwnerOfProfile = nickname === user.nickname;
    const { loading, userProfile } = useGetProfileByNickname(nickname);
    const { loadingPost, postlist } = useFetchProfilePost(userProfile);
    const { isUpdating, handlerFollow, isFollowing } = useFollow(userProfile?.uid);
    return (
        <Box w={'full'} maxW={'600px'} id={'container_profile'}>
            {loading && <ProfileLoading elementWidth={elementWidth} />}
            {!loading && !userProfile && <ProfileNotExist />}
            {!loading && userProfile && (
                <VStack position={'relative'} w={'full'} spacing={5}>
                    {/* informaition of profile */}
                    <Flex
                        // border={'0.5px solid rgba(0, 0, 0, 0.24)'}
                        boxShadow={'1px 1px 5px rgba(0,0,0,0.24)'}
                        direction={'column'}
                        borderRadius={7}
                        height={'max-content'}
                        bg={'white'}
                        alignItems={'flex-start'}
                        w={'full'}
                    >
                        {/* background image */}
                        <Image
                            borderTopRadius={7}
                            src={userProfile?.backgroundimage ? userProfile?.backgroundimage : '/noImage.jpg'}
                            alt={'background image'}
                            w={'full'}
                            h={elementWidth / 2.7 + 'px'}
                            objectFit={'cover'}
                        />
                        {/* avartar */}
                        <Box
                            mt={'-' + elementWidth / 7.6 + 'px'}
                            ml={'2%'}
                            borderRadius={999999}
                            h={elementWidth / 3.8 + 'px'}
                            w={elementWidth / 3.8 + 'px'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Image
                                src={userProfile?.avatarimage ? userProfile?.avatarimage : '/avatar.jpg'}
                                alt={'avatar image'}
                                objectFit={'cover'}
                                h={elementWidth / 4 + 'px'}
                                w={elementWidth / 4 + 'px'}
                                borderRadius={999999}
                            />
                        </Box>
                        {/* button */}
                        <Button
                            position={'absolute'}
                            size={{ base: 'xs', md: 'lg' }}
                            right={'3%'}
                            top={elementWidth / 2.4 + 'px'}
                            variant={isOwnerOfProfile ? 'outline' : isFollowing ? 'ghost' : 'solid'}
                            colorScheme={'green'}
                            onClick={isOwnerOfProfile ? onOpen : handlerFollow}
                            isLoading={isUpdating}
                        >
                            {isOwnerOfProfile ? 'Edit profile' : isFollowing ? 'Un Follow' : 'Follow'}
                        </Button>
                        {/* {text area} */}
                        <Flex direction={'column'} alignItems={'flex-start'} mx={'5%'}>
                            <Text fontWeight={750} fontSize={'2xl'}>
                                {userProfile?.name}
                            </Text>
                            <Text color={'gray.700'} mt={'-1%'}>
                                {userProfile?.nickname}
                            </Text>
                            <Text mt={1}>{userProfile?.bio}</Text>
                            {userProfile?.location && (
                                <Flex alignItems={'center'} gap={2}>
                                    <FiMapPin style={{ width: '19px', height: '19px' }} />{' '}
                                    <Text mt={1}>{userProfile.location}</Text>
                                </Flex>
                            )}
                            {userProfile?.website && (
                                <Flex alignItems={'center'} gap={2}>
                                    <CgWebsite style={{ width: '19px', height: '19px' }} />{' '}
                                    <Text mt={1}>{userProfile.website}</Text>
                                </Flex>
                            )}
                            <Flex color={'gray.700'} gap={1} alignItems={'center'} my={2}>
                                <CalendarIcon width="19px" height="19px" />
                                <Text>{FormatDate(userProfile?.joinedat)}</Text>
                            </Flex>
                            <Flex my={2} justifyContent={'flex-start'} gap={4}>
                                <Link display={'flex'} direction="row" fontSize={'sm'}>
                                    <Text fontWeight={'500'}>
                                        {userProfile?.following.length} {}
                                    </Text>
                                    <span>&nbsp;</span> {`${' '} Followings`}
                                </Link>
                                <Link display={'flex'} direction="row" fontSize={'sm'}>
                                    <Text fontWeight={'500'}>
                                        {userProfile?.follower.length} {}
                                    </Text>
                                    <span>&nbsp;</span> {`${' '} Followers`}
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>
                    {!loadingPost && postlist && postlist.length > 0 && postlist.map((id) => <Post key={id} id={id} />)}
                    {/* modal */}
                    <Modal id="edit-profile" isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: '2xl' }}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit profile</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <ProfileForm onClose={onClose} userProfile={userProfile} />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </VStack>
            )}
        </Box>
    );
};
const ProfileNotExist = () => {
    return (
        <Flex w={'full'} p={{ base: 4, md: 10 }} direction={'column'} alignItems={'center'}>
            <Image src="/wondering.png" alt="not found image" w={'80%'} />
            <Text fontSize={'xl'}>{'The profile does not exists.'}</Text>
        </Flex>
    );
};
const ProfileLoading = ({ elementWidth }) => {
    return (
        <VStack position={'relative'} w={'full'} maxW={'600px'} spacing={5}>
            {/* informaition of profile */}
            <Flex
                direction={'column'}
                borderRadius={15}
                height={'max-content'}
                id={'container_profile'}
                boxShadow={'lg'}
                // border={'1px solid rgba(0, 0, 0, 0.24)'}
                alignItems={'flex-start'}
                w={'full'}
            >
                {/* background image */}
                <Skeleton height={elementWidth / 2.7 + 'px'} />
                {/* avartar */}
                <Skeleton
                    mt={'-' + elementWidth / 7.6 + 'px'}
                    ml={'2%'}
                    borderRadius={999999}
                    h={elementWidth / 3.8 + 'px'}
                    w={elementWidth / 3.8 + 'px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                ></Skeleton>
                {/* button */}

                {/* {text area} */}
                <VStack>
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                </VStack>
            </Flex>
        </VStack>
    );
};
export default ProfilePage;
