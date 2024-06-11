import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { useDisclosure, Tooltip, Link, Text } from '@chakra-ui/react';
import MessageDrawer from '../Message/MessageDrawer';
const Message = ({ width }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Tooltip hasArrow placement="right" label={'Home'} display={{ base: 'block', md: 'none' }}>
            <Link
                _active={{ transform: 'scale(1.2)' }}
                display={'flex'}
                gap={2}
                alignItems={'center'}
                justifyContent={{ base: 'center', md: 'flex-start' }}
                borderRadius={6}
                padding={{ base: 1, md: 3 }}
                _hover={{ bg: 'blackAlpha.200' }}
                colorScheme="teal"
                onClick={onOpen}
            >
                {<AiOutlineMessage size={width < 400 ? 22 : 33} />}
                <Text display={{ base: 'none', md: 'block' }}>{'Message'}</Text>
                <MessageDrawer isOpen={isOpen} onClose={onClose} />
            </Link>
        </Tooltip>
    );
};

export default Message;
