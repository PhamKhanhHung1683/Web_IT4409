import { Box, Flex, Image, Link, Text, useDisclosure } from '@chakra-ui/react';
import React, { memo, useContext, useState } from 'react';
import { CommentsIcon, LikeIcon, LikedIcon, ShareIcon } from '~/assets/constant';
import EditPost from './EditPost'; // Đường dẫn tới file EditPost của bạn
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { ScreenContext } from '~/contexts/ScreenContext';
import useFetchPostById from '~/hooks/useFetchPostById';
import useLikePost from '~/hooks/useLikePost';
import { forwardRef } from 'react';
import MiniPost from './MiniPost';
import Share from './Share';
import useGetFinalShareId from '~/hooks/useGetShareId';
import Header from './Header';
import PostSkeleton from './PostSkeleton';
import ListLikes from './ListLikes';

const Post = ({ id }, ref) => {
    const { width } = useContext(ScreenContext);
    const { loading, postDoc } = useFetchPostById(id);
    const [triggerComment, setTriggerCommnent] = useState(false);
    const [showLikesList, setShowLikesList] = useState(false);
    const toggleLikesList = () => setShowLikesList(!showLikesList);

    const { isLiked, handleLikePost } = useLikePost(id);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEditing, setIsEditing] = useState(false);
    const finalShareId = useGetFinalShareId({ postDoc });
    console.log('finalshared id', finalShareId);
    return (
        <>
            {!loading && postDoc && (
                <Flex
                    bg={'white'}
                    w={'full'}
                    h={'max-content'}
                    pb={1}
                    direction={'column'}
                    alignItems={'stretch'}
                    borderRadius={4}
                    // border={'0.5px solid rgba(0, 0, 0, 0.24)'}
                    boxShadow={'1px 1px 5px rgba(0,0,0,0.24)'}
                >
                    <Header postDoc={postDoc} setIsEditing={setIsEditing} />
                    {/* content of post */}
                    <Text px={3} pb={1}>
                        {postDoc.caption}
                    </Text>
                    {/* image or shared post*/}
                    {postDoc.share !== '' && <MiniPost id={finalShareId} />}
                    {postDoc.share === '' && postDoc.imgurl && (
                        <Image src={postDoc.imgurl} w={'full'} alt="Post Image" />
                    )}
                    <Flex gap={5} px={3} py={1}>
                        <Link color={'gray.800'} fontWeight={'600'} onClick={toggleLikesList}>
                            {postDoc?.likes.length} likes
                        </Link>
                        <Link color={'gray.800'} fontWeight={'600'} onClick={() => setTriggerCommnent((prev) => !prev)}>
                            {postDoc?.comments.length} comments
                        </Link>
                    </Flex>
                    {/* action */}
                    <Box px={3}>
                    {showLikesList && (

    <ListLikes postId={id} toggleLikesList={toggleLikesList} />
  
)}
                        <Flex
                            w={'full'}
                            gap={width < 500 ? 3 : width < 800 ? 7 : 10}
                            justifyContent={'space-between'}
                            borderTop={'1px solid rgba(0, 0, 0, 0.24)'}
                            alignItems={'center'}
                            py={1}
                        >
                            <Flex
                                alignItems={'center'}
                                gap={1.5}
                                px={{ base: 2, md: 8 }}
                                py={1}
                                cursor={'pointer'}
                                transition={'0.2s ease-in-out'}
                                _hover={{ bg: 'gray.100' }}
                                borderRadius={10}
                                onClick={handleLikePost}
                            >
                                {isLiked ? (
                                    <LikedIcon width={width < 500 ? '18px' : width < 800 ? '20px' : '25px'} />
                                ) : (
                                    <LikeIcon width={width < 500 ? '18px' : width < 800 ? '20px' : '25px'} />
                                )}
                                <Text color={'gray.600'} fontWeight={'600'}>
                                    Like
                                </Text>
                            </Flex>
                            <Flex
                                alignItems={'center'}
                                gap={1.5}
                                px={{ base: 2, md: 8 }}
                                py={1}
                                cursor={'pointer'}
                                transition={'0.2s ease-in-out'}
                                _hover={{ bg: 'gray.100' }}
                                borderRadius={10}
                                onClick={() => {
                                    setTriggerCommnent((prev) => !prev);
                                    console.log(postDoc.id);
                                }}
                                ref={ref}
                            >
                                <CommentsIcon width={width < 500 ? '18px' : width < 800 ? '20px' : '25px'} />
                                <Text color={'gray.600'} fontWeight={'600'}>
                                    Comment
                                </Text>
                            </Flex>
                            <Flex
                                alignItems={'center'}
                                gap={1.5}
                                px={{ base: 2, md: 8 }}
                                py={1}
                                cursor={'pointer'}
                                transition={'0.2s ease-in-out'}
                                _hover={{ bg: 'gray.100' }}
                                borderRadius={10}
                                onClick={onOpen}
                            >
                                <ShareIcon width={width < 500 ? '18px' : width < 800 ? '20px' : '25px'} />
                                <Text color={'gray.600'} fontWeight={'600'}>
                                    Share
                                </Text>
                                <Share width={width} isOpen={isOpen} onClose={onClose} shareId={finalShareId} />
                            </Flex>
                        </Flex>
                    </Box>
                    {/* comment */}
                    {triggerComment && (
                        <Box px={3}>
                            {postDoc?.comments.length > 0 ? (
                                <CommentList comments={postDoc.comments} layer={1} postedUserId={postDoc.createdby} />
                            ) : (
                                'No comment!'
                            )}
                            <CommentForm postid={postDoc.id} postedUserId={postDoc.createdby} reply={''} />
                        </Box>
                    )}
                </Flex>
            )}
            {isEditing && <EditPost post={postDoc} isOpen={isEditing} onClose={() => setIsEditing(false)} />}
            {/* {!loading && !postDoc && <Text>Post not found!</Text>}
            <EditPost isOpen={isOpen} onClose={onClose} post={postDoc} /> */}
            {!loading && !postDoc && 'Post was deleted!'}
            {loading && <PostSkeleton />}
        </>
    );
};

export default memo(forwardRef(Post));
