import { Button } from '@chakra-ui/react';
import React from 'react';
import useFollow from '~/hooks/useFollow';

const FollowButton = ({ userDoc }) => {
    const { handlerFollow, isUpdating, isFollowing } = useFollow(userDoc?.uid);
    return (
        <Button
            variant={isFollowing ? 'ghost' : 'solid'}
            colorScheme={'green'}
            isLoading={isUpdating}
            onClick={handlerFollow}
        >
            {isFollowing ? 'Un Follow' : 'Follow'}
        </Button>
    );
};

export default FollowButton;
