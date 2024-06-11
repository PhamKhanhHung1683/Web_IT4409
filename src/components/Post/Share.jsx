import {
    Avatar,
    Button,
    Flex,
    Input,
    Text,
} from '@chakra-ui/react';
import React, {  useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import useAuthStore from '../../stores/authStore';
import useReadImage from '../../hooks/useReadImage';
import usePost from '../../hooks/usePost';
import MiniPost from './MiniPost';
const Share = ({ width, isOpen, onClose, shareId }) => {
    const user = useAuthStore((state) => state.user);
    const { selectedFile,  setSelectedFile } = useReadImage();
    const [input, setInput] = useState('');
    const { isLoading, newPost } = usePost(false);
    const handlerPost = async () => {
        await newPost(input, selectedFile, shareId);
        setInput(null);
        setSelectedFile(null);
        onClose();
    };
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* body */}
                        <hr />
                        {/* header */}
                        <Flex mt={4} alignItems={'center'}>
                            <Avatar src={user?.avatarimage ? user.avatarimage : '/noimage.jpg'} />

                            <Flex ml={2} direction={'column'}>
                                <Text fontWeight={'bold'}>{user && user.name}</Text>
                                <Text mt={-1}>{user && user.nickname}</Text>
                            </Flex>
                        </Flex>
                        {/* input */}
                        <Input
                            mt={4}
                            size={'lg'}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            variant="unstyled"
                            placeholder="What're you feeling?"
                        />
                        <MiniPost id={shareId} />
                    </ModalBody>

                    <ModalFooter display={'flex'} justifyContent={'space-between'}>
                        <Button colorScheme="blue" onClick={handlerPost} isLoading={isLoading}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Share;
