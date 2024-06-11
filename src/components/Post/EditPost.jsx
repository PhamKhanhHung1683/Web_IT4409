import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Image,
    CloseButton,
    Box,
} from '@chakra-ui/react';
import { CiImageOn } from 'react-icons/ci';
import useReadImage from '../../hooks/useReadImage';
import usePost from '../../hooks/usePost';
import useDeletePost from '../../hooks/useDeletePost';
import MiniPost from './MiniPost';

const EditPost = ({ post, width, isOpen, onClose }) => {
    const { selectedFile, handlerFileChange, setSelectedFile } = useReadImage();
    const [input, setInput] = useState(post.caption);
    const imageRef = useRef();
    const { isLoading, editPost } = usePost(false);
    const { deletePost } = useDeletePost();

    useEffect(() => {
        if (post.imgurl !== '') setSelectedFile(post.imgurl);
        else {
            setSelectedFile(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerEdit = async () => {
        if (input.trim() === '' && !selectedFile) {
            await deletePost(post);
        } else {
            await editPost(post.id, input, selectedFile);
            setInput('');
            setSelectedFile(null);
        }
        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            size={'lg'}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            variant="unstyled"
                            placeholder="What're you feeling?"
                        />

                        {selectedFile ? (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <Image mt={4} w={'full'} src={selectedFile || post.imgurl} alt="selected" />
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
                        ) : (
                            ''
                        )}
                        {post.share !== '' && <MiniPost id={post.share} />}
                    </ModalBody>
                    <ModalFooter display={'flex'} justifyContent={'space-between'}>
                        <Box
                            onClick={() => {
                                imageRef.current.click();
                            }}
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
                        <Button colorScheme="blue" onClick={handlerEdit} isLoading={isLoading}>
                            Edit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditPost;
