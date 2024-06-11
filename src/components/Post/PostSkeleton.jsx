import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import React from 'react';

const PostSkeleton = () => {
    return (
        <Flex
            direction={'column'}
            padding={4}
            borderRadius={4}
            w={'full'}
            h={'max-content'}
            boxShadow={'1px 1px 5px rgba(0,0,0,0.24)'}
            bg={'white'}
        >
            <Flex w="full" gap={2}>
                <SkeletonCircle w={'50px'} h={'50px'} />
                <SkeletonText flex={1} noOfLines={2} spacing="2" skeletonHeight="3" />
            </Flex>
            <SkeletonText mt={5} noOfLines={6} spacing="2" skeletonHeight="2" />
        </Flex>
    );
};

export default PostSkeleton;
