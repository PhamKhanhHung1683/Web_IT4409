import {
    CloseButton,
    Avatar,
    Box,
    Button,
    Flex,
    Image,
    Input,
    Link,
    Text,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BsLightningChargeFill } from 'react-icons/bs';
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
import { CiImageOn } from 'react-icons/ci';
import useReadImage from '../../hooks/useReadImage';
import usePost from '../../hooks/usePost';
const Create = ({ width }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useAuthStore((state) => state.user);
    const { selectedFile, handlerFileChange, setSelectedFile } = useReadImage();
    const [input, setInput] = useState('');
    const imageRef = useRef();
    const { isLoading, newPost } = usePost(false);
    const handlerPost = async () => {
        await newPost(input, selectedFile, '');
        setInput(null);
        setSelectedFile(null);
        onClose();
    };
    return (
        <>
            <Tooltip hasArrow placement="right" label={'Create'} display={{ base: 'block', md: 'none' }}>
                <Link
                    _active={{ transform: 'scale(1.2)' }}
                    display={'flex'}
                    gap={2}
                    alignItems={'center'}
                    justifyContent={{ base: 'center', md: 'flex-start' }}
                    borderRadius={6}
                    padding={{ base: 1, md: 3 }}
                    _hover={{ bg: 'blackAlpha.200' }}
                    onClick={onOpen}
                >
                    {<BsLightningChargeFill size={width < 400 ? 22 : 33} />}
                    <Text display={{ base: 'none', md: 'block' }}>{'Create'}</Text>
                </Link>
            </Tooltip>
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
                        {selectedFile && (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <Image mt={4} w={'full'} src={selectedFile} alt="selected" />
                                <CloseButton
                                    onClick={() => {
                                        setSelectedFile(null);
                                        if (imageRef.current) {
                                            imageRef.current.value = null;
                                        }
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '0',
                                    }}
                                />
                            </div>
                        )}
                        {/* {selectedFile ? <Image mt={4} w={'full'} src={selectedFile} alt="image of post" /> : ''} */}
                    </ModalBody>

                    <ModalFooter display={'flex'} justifyContent={'space-between'}>
                        <Box
                            onClick={() => {
                                imageRef.current.click();
                            }}
                            cursor={'pointer'}
                            borderRadius={9999}
                            _hover={{ bg: 'gray.200', transform: 'scale(1.02)' }}
                            _active={{ bg: 'gray.200', transform: 'scale(0.99)' }}
                            padding={{ base: 1, md: 2 }}
                        >
                            <CiImageOn
                                _hover={{ stroke: '3px' }}
                                size={width < 400 ? '15px' : width < 800 ? '22px' : '33px'}
                            />
                            <Input ref={imageRef} type="file" onChange={handlerFileChange} hidden />
                        </Box>
                        <Button colorScheme="blue" onClick={handlerPost} isLoading={isLoading}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Create;
