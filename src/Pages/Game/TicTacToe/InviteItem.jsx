import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import useInvite from '~/hooks/useInvite';
const InviteItem = ({ doc }) => {
    const { id } = useParams();
    const { invite, loading, invited } = useInvite();

    return (
        <Flex
            h={'80px'}
            gap={2}
            _hover={{ bg: 'blackAlpha.100' }}
            p={3}
            borderRadius={3}
            cursor={'pointer'}
            // onClick={() => {
            //     if (!invited) invite('xo', doc.uid, id);
            // }}
        >
            <Avatar src={doc.avatarimage || '/noImage.jpg'} />
            <Flex direction={'column'} flex={1}>
                <Text fontWeight={700}>{doc.name}</Text>
                <Text fontSize={'sm'} color={'gray'}>
                    {doc.nickname}
                </Text>
            </Flex>
            <Button
                variant={invited ? 'ghost' : 'solid'}
                pointerEvents={invited && 'none'}
                onClick={() => {
                    if (!invited) invite('xo', doc.uid, id);
                }}
                isLoading={loading}
            >
                {invited ? 'Invited' : 'Invite'}
            </Button>
        </Flex>
    );
};

export default InviteItem;
