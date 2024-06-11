import { Flex, Image, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import Post from '~/components/Post/Post';
import useFetchFeedPosts from '~/hooks/useFetchFeedPosts';

const HomePage = () => {
    const { isLoading, postlist } = useFetchFeedPosts();

    return (
        <Flex direction={'column'} gap={2} w={'full'} maxW={'576px'} h={'max-content'}>
            {!isLoading && postlist && postlist.length > 0 && (
                <Flex direction={'column'} gap={1}>
                    {postlist.map((id) => {
                        return <Post key={id} id={id} />;
                    })}{' '}
                </Flex>
            )}
            {!isLoading && postlist.length === 0 && (
                <Flex direction={'column'} alignItems={'center'}>
                    <Image src={'/nofeedpost.png'} w="full" />
                    <Text size={'xl'}>May be you first go to our Page, please follow some people</Text>
                </Flex>
            )}
        </Flex>
    );
};

export default memo(HomePage);
