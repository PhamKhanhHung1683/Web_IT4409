import React, { useEffect, useRef, useState } from 'react';
import styles from './chatzone.module.scss';
import classNames from 'classnames/bind';
import { Box, Image, Input, Spinner } from '@chakra-ui/react';
import { IoCloseOutline, IoSendSharp } from 'react-icons/io5';
import { CiImageOn } from 'react-icons/ci';
import useReadImage from '~/hooks/useReadImage';
import useAuthStore from '~/stores/authStore';
import { firestore, storage } from '~/Firebase/Firebase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, uploadString, ref as StorageRef } from 'firebase/storage';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);
const Footer = ({ id, userDoc }) => {
    const [input, setInput] = useState('');
    const { user } = useAuthStore();
    const { handlerFileChange, selectedFile, setSelectedFile } = useReadImage();
    const ref = useRef();
    const [sending, setSending] = useState(false);
    useEffect(() => {
        var textArea = document.getElementById('test');
        var wrapper = document.getElementsByClassName(cx('input-wrapper'))[0];
        textArea.addEventListener('input', (evt) => {
            wrapper.style.height = '35px';
            console.log(textArea.scrollHeight);
            wrapper.style.height = textArea.scrollHeight + 'px';
        });
        setInput('');
        setSelectedFile(null);
    }, [id]);
    const sendMessage = async () => {
        console.log('sendmessage', id, input);
        if (input === '' && selectedFile === null) {
            return;
        }
        setSending(true);
        const messageid = uuidv4();
        let imageurl = '';
        let content = '';
        if (selectedFile) {
            const imageRef = StorageRef(storage, `messages/${id}/${messageid}`);
            await uploadString(imageRef, selectedFile, 'data_url');
            imageurl = await getDownloadURL(imageRef);
        }
        if (input) {
            content = input;
        }
        await updateDoc(doc(firestore, 'chats', id), {
            messages: arrayUnion({
                id: messageid,
                from: user.uid,
                content,
                imageurl,
                time: Date.now(),
            }),
        });
        await updateDoc(doc(firestore, 'userchats', user.uid), {
            [id + '.lastmessage']: {
                id: messageid,
                from: user.uid,
                content,
                imageurl,
            },
            [id + '.date']: Date.now(),
        });
        await updateDoc(doc(firestore, 'userchats', userDoc.uid), {
            [id + '.lastmessage']: {
                id: messageid,
                from: user.uid,
                content,
                imageurl,
            },
            [id + '.date']: Date.now(),
        });
        setInput('');
        setSelectedFile(null);
        setSending(false);
    };
    return (
        <div className={cx('footer')}>
            <Box
                p={1}
                cursor={'pointer'}
                _hover={{ bg: 'rgba(0,0,0,0.1)' }}
                width={'max-content'}
                height={'max-content'}
                borderRadius={'full'}
                onClick={() => ref.current.click()}
            >
                <CiImageOn _hover={{ stroke: '3px' }} size={'25px'} />
            </Box>
            <div className={cx('input-wrapper')}>
                <textarea id="test" placeholder="Aa" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <Box
                height="max-content"
                p={2}
                display={'flex'}
                _hover={{ bg: 'rgba(0,0,0,0.1)' }}
                cursor={'pointer'}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'full'}
                justifySelf={'flex-end'}
                color={'green'}
                onClick={() => {
                    sendMessage();
                }}
            >
                {!sending && <IoSendSharp />}
                {sending && <Spinner />}
            </Box>
            <Input onChange={handlerFileChange} ref={ref} type="file" hidden />
            {selectedFile && (
                <Box position={'absolute'} bottom={'70px'}>
                    <Image
                        h={'70px'}
                        boxShadow={'1px 1px 10px rgba(0,0,0,0.24)'}
                        left={'10px'}
                        src={selectedFile}
                        alt="image"
                    />
                    <Box
                        cursor={'pointer'}
                        _active={{ transform: 'scale(0.99)' }}
                        _hover={{ transform: 'scale(1.1)' }}
                        position={'absolute'}
                        top={-1}
                        right={-1}
                        w={'15px'}
                        p={'1px'}
                        borderRadius={'30px'}
                        bg={'white'}
                        boxShadow={'1px 1px 10px rgba(0,0,0,0.24)'}
                        onClick={() => setSelectedFile(null)}
                    >
                        {<IoCloseOutline size={'full'} />}
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default Footer;
