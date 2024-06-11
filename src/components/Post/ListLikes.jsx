import React from 'react';
import { Box, Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom'; // Import thêm Link từ react-router-dom
import useLikesList from '~/hooks/useLikesList';

const ListLikes = ({ postId }) => {
    const { isLoading, likesList, error } = useLikesList(postId);

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading likes!</Text>;

    return (
        <Box bg="white" w="100%" p={4} color="black" boxShadow="md" rounded="md" >
            <List spacing={3}>
                {likesList.map((like) => (
                    <ListItem key={like.uid}>
                        <ListIcon as={MdFavorite} color="pink.500" />
                        {/* Bọc like.name trong Link */}
                        <Link to={`/profile/${like.nickname}`} style={{ textDecoration: 'none', color: 'blue.500' }}>
                            {like.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ListLikes;