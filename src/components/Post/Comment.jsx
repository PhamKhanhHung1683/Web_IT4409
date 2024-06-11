import {
    Avatar,
    Box,
    Flex,
    Input,
    InputGroup,
    InputRightAddon,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';
import useGetCommentById from '~/hooks/useGetCommentById';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import useAuthStore from '~/stores/authStore';
import { HiDotsHorizontal } from 'react-icons/hi';
import useDeleteComment from '~/hooks/useDeleteComment';
import { IoSendSharp } from 'react-icons/io5';
import useUpdateComment from '~/hooks/useUpdateComment';

const Comment = ({ id, layer, parent, postedUserId }) => {
    const { isLoading, userDoc, commentDoc } = useGetCommentById(id);
    const { user } = useAuthStore();
    const [expand, setExpand] = useState(false);
    const { deleteLoading, handlerDeleteComment } = useDeleteComment();
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState('');
    const { loading, updateComment } = useUpdateComment();
    useEffect(() => {
        if (commentDoc) setEditValue(commentDoc.comment);
    }, [commentDoc]);
    return (
        <>
            {!isLoading && (
                <Flex direction={'column'}>
                    <Flex gap={1} alignItems={'flex-start'} py={1}>
                        <Avatar
                            src={userDoc?.avatarimage ? userDoc?.avatarimage : '/noimage.jpg'}
                            alt={userDoc?.name}
                            size={'sm'}
                        />
                        <Flex direction={'column'} flex={1} justifyContent={'flex-start'}>
                            <Flex gap={1}>
                                {editMode ? (
                                    <Flex direction={'column'} w={'full'}>
                                        <InputGroup size="sm">
                                            <Input
                                                placeholder="Comment"
                                                value={editValue}
                                                bg={'gray.200'}
                                                variant={'unstyle'}
                                                borderRadius={'5px'}
                                                onChange={(e) => setEditValue(e.target.value)}
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
                                                    cursor={editValue.length === 0 ? 'not-allowed' : 'pointer'}
                                                    onClick={async (e) => {
                                                        await updateComment(id, editValue);
                                                        setEditMode(false);
                                                    }}
                                                >
                                                    <IoSendSharp />
                                                </Box>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Text
                                            onClick={() => setEditMode(false)}
                                            color={'green'}
                                            _hover={{ textDecor: 'underline' }}
                                            cursor={'pointer'}
                                            fontSize={'xs'}
                                            mt={'-3px'}
                                        >
                                            Cancel
                                        </Text>
                                    </Flex>
                                ) : (
                                    <Flex
                                        borderRadius={10}
                                        px={2}
                                        py={1}
                                        bg={'gray.200'}
                                        direction={'column'}
                                        alignItems={'flex-start'}
                                        w={'max-content'}
                                    >
                                        <Text fontSize={'sm'} fontWeight={600}>
                                            {userDoc?.name}
                                        </Text>
                                        <Text w={'full'} display={'flex'} gap={1}>
                                            <span style={{ fontWeight: '500' }}>{layer >= 3 ? `${parent} ` : ''}</span>
                                            {commentDoc?.comment}
                                        </Text>
                                    </Flex>
                                )}

                                {user && userDoc && user.uid === userDoc.uid && !editMode && (
                                    <Menu>
                                        <MenuButton
                                            w={'20px'}
                                            height={'20px'}
                                            alignSelf={'center'}
                                            p={1}
                                            borderRadius={'full'}
                                            _hover={{ bg: 'blackAlpha.200' }}
                                            cursor={'pointer'}
                                            _active={{ transform: 'scale(0.9)' }}
                                        >
                                            <HiDotsHorizontal size={'100%'} />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
                                            <MenuItem color={'red'} onClick={() => handlerDeleteComment(id)}>
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                )}
                            </Flex>
                            <Text
                                cursor={'pointer'}
                                _hover={{ textDecor: 'underline' }}
                                fontSize={'sm'}
                                onClick={() => setExpand((prev) => !prev)}
                            >
                                {commentDoc?.child.length > 0 && commentDoc?.child.length} Reply
                            </Text>

                            {/* list child comment */}
                            {layer < 3 && expand && (
                                <Box>
                                    {commentDoc?.child && (
                                        <CommentList
                                            postedUserId={postedUserId}
                                            parent={userDoc.name}
                                            layer={layer + 1}
                                            comments={commentDoc?.child}
                                        />
                                    )}
                                    <CommentForm
                                        postid={commentDoc?.postid}
                                        parent={id}
                                        name={userDoc?.name}
                                        postedUserId={postedUserId}
                                        reply={userDoc?.uid}
                                    />
                                </Box>
                            )}
                        </Flex>
                    </Flex>
                    {layer >= 3 && expand && (
                        <Box>
                            {commentDoc?.child && (
                                <CommentList
                                    parent={userDoc.name}
                                    layer={layer + 1}
                                    comments={commentDoc?.child}
                                    postedUserId={postedUserId}
                                />
                            )}
                            <CommentForm
                                postid={commentDoc?.postid}
                                parent={id}
                                name={userDoc?.name}
                                postedUserId={postedUserId}
                                reply={userDoc?.uid}
                            />
                        </Box>
                    )}
                </Flex>
            )}
        </>
    );
};

export default memo(Comment);
