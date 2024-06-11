import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import InviteItem from './InviteItem';
import useRelativeAccount from '~/hooks/useRelativeAccount';
import { useDebounce } from '~/hooks';

const Invite = ({ isOpen, onClose }) => {
    const { listUser } = useRelativeAccount();
    const [search, setSearch] = useState('');
    const debounceValue = useDebounce(search, 200);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Invite </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Search " value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Flex direction={'column'} mt="10px" maxH={'300px'} overflowY={'scroll'}>
                            {listUser &&
                                listUser
                                    .filter((element) => element.nickname.includes(debounceValue))
                                    .map((element) => {
                                        return <InviteItem key={element.uid} doc={element} />;
                                    })}
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Invite;
