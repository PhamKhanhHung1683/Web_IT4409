import { Flex, Image, Text } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import useFetchPostById from '~/hooks/useFetchPostById';
import Header from './Header';
import EditPost from './EditPost';

const MiniPost = ({ id }) => {
    const { loading, postDoc } = useFetchPostById(id);
    const [isEditing, setIsEditing] = useState(false);
    if (!postDoc) {
        return (
            <>
                {!loading && (
                    <Flex
                        bg={'white'}
                        w={'97%'}
                        h={'150px'} // Tăng chiều cao của Flex
                        mx={'auto'}
                        pb={1}
                        direction={'column'}
                        alignItems={'center'} // Canh giữa theo chiều ngang
                        justifyContent={'center'} // Canh giữa theo chiều dọc
                        borderRadius={7}
                        border={'0.5px solid rgba(0, 0, 0, 0.24)'}
                        boxShadow={'0.5px 0.5px 0.8px #000000'} // Bật boxShadow
                    >
                        <Text fontSize={'xl'} fontWeight={'bold'}>
                            Shared post no longer exists!
                        </Text>
                    </Flex>
                )}
            </>
        );
    }

    return (
        <>
            {!loading && postDoc && (
                <Flex
                    bg={'white'}
                    w={'97%'}
                    h={'max-content'}
                    mx={'auto'}
                    pb={1}
                    direction={'column'}
                    alignItems={'stretch'}
                    borderRadius={7}
                    border={'0.5px solid rgba(0, 0, 0, 0.24)'}
                >
                    {/* image  */}
                    {postDoc.share === '' && postDoc.imgurl && (
                        <Image src={postDoc.imgurl} w={'full'} alt="Post Image" />
                    )}
                    {/* Header */}
                    <Header postDoc={postDoc} setIsEditing={setIsEditing} />
                    {/* content of post */}
                    <Text px={3} pb={1} cursor={'pointer'}>
                        {postDoc.caption}
                    </Text>
                    {postDoc && isEditing && (
                        <EditPost post={postDoc} isOpen={isEditing} onClose={() => setIsEditing(false)} />
                    )}
                </Flex>
            )}
        </>
    );
};

export default memo(MiniPost);
