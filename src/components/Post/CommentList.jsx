import React, { memo } from 'react';
import Comment from './Comment';
import { Box, Link } from '@chakra-ui/react';

const CommentList = ({ comments,layer,parent,postedUserId }) => {
    
    return (
        <Box  my={3}>
            {comments && comments.map((id) => <Comment parent={parent} layer={layer} key={id} id={id} postedUserId={postedUserId} />)}

        </Box>
    );
};

export default memo(CommentList);
