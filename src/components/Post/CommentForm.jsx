import { Avatar, Box, Button, Flex, Input, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react';
import React, { memo, useRef, useState } from 'react';
import { CommentIcon, CommentsIcon, PostCommentIcon, PostIcon } from '~/assets/constant';
import useSendComment from '~/hooks/useSendComment';
import useAuthStore from '~/stores/authStore';
import { IoSendSharp } from 'react-icons/io5';
const CommentForm = ({ postid, parent = '', name = '', postedUserId, reply }) => {
    const { user } = useAuthStore();
    const [comment, setComment] = useState('');
    const { loading, sendComment } = useSendComment();
    const inputRef = useRef();
    return (
        <Flex gap={1} alignItems={'center'} py={1}>
            <Avatar src={user?.avatarimage} alt="name" size={'sm'} />

            <InputGroup>
                <Input
                    variant={'unstyled'}
                    ref={inputRef}
                    placeholder={name ? `Reply ${name}` : 'Comment'}
                    flex={1}
                    borderRadius={10}
                    px={3}
                    py={2}
                    bg={'gray.200'}
                    direction={'column'}
                    alignItems={'flex-start'}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <InputRightElement color={'green'}>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        mx={0.5}
                        my={0.5}
                        p={{ base: 0.5, md: 1 }}
                        borderRadius={15}
                        bg={'transparent'}
                        _hover={{ color: 'green.800', transform: 'scale(1.04)' }}
                        transition={'0.1s ease-in-out'}
                        _active={{ color: 'green.500', transform: 'scale(0.99)' }}
                        cursor={comment.length === 0 ? 'not-allowed' : 'pointer'}
                        onClick={() => {
                            if (comment) sendComment(comment, postid, postedUserId, parent, reply);
                            setComment('');
                            inputRef.current.focus();
                        }}
                    >
                        {!loading && <IoSendSharp />}
                        {loading && <Spinner />}
                    </Box>
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
};

export default memo(CommentForm);
