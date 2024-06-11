import { Avatar, Box, Flex, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollow from '~/hooks/useFollow'; // Import useFollow hook
import useAuthStore from "~/stores/authStore";

const SuggestedUser = ({suggestedUser, onCloseDrawer}) => {
    const {user} = useAuthStore();
    const { handlerFollow, isFollowing } = useFollow(suggestedUser.uid); // Use the hook with the user's id

    const handleLinkClick = () => {
        // Gọi hàm đóng drawer khi link được nhấn
        onCloseDrawer();
    };



    return(
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} marginTop={"5"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`/profile/${suggestedUser.nickname}`} onClick={handleLinkClick}>
                    <Avatar src={suggestedUser.avatarimage} size={"md"} />
                </Link>
                <VStack spacing={2} alignItems={"flex-start"}>
                    <Link to={`/profile/${suggestedUser.nickname}`} onClick={handleLinkClick}>
                        <Box fontSize={12} fontWeight={"bold"}>
                            {suggestedUser.name}
                        </Box>
                    </Link>
                    <Box fontSize={11} color={"gray.500"}>
                        {suggestedUser.nickname}
                    </Box>
                </VStack>
            </Flex>
            {user.uid !== suggestedUser.uid &&(
                <Button colorScheme={isFollowing ? 'gray' : 'green'} onClick={handlerFollow} width={'30%'}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            )}
            
        </Flex>
    )
}

export default SuggestedUser;