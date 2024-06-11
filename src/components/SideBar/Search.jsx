import {  Flex, FormControl, Input, Link, Spinner, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import useSearchUser from '~/hooks/useSearchUser'
import SuggestedUser from '../SuggestedUser/SuggestedUser'
import { debounce } from 'lodash';


const Search = ({ width }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const searchRef = useRef(null);
    const { isLoading, getUserProfile, users, setUsers } = useSearchUser();
    const [hasSearched, setHasSearched] = useState(false);

    const onCloseDrawer = () => {
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce((value) => {
        if(!value){
            setHasSearched(false);
            setUsers(null);
        }
        if (value) {
            setHasSearched(true);
            getUserProfile(value);
        }
    }, 300), []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        debouncedSearch(value);
    };

    

    return (
        <>
            <Tooltip
                hasArrow
                placement="right"
                label={"Search"}
                display={{ base: 'block', md: 'none' }}
            >

                <Link
                    _active={{ transform: 'scale(1.2)' }}
                    display={'flex'}
                    gap={2}
                    alignItems={'center'}
                    justifyContent={{ base: 'center', md: 'flex-start' }}
                    borderRadius={6}
                    padding={{ base: 1, md: 3 }}
                    _hover={{ bg: 'blackAlpha.200' }}
                    ref={btnRef}
                    onClick={onOpen}
                >
                    {<IoSearch size={width < 400 ? 22 : 33} />}
                    <Text
                        display={{ base: 'none', md: 'block' }}
                    >
                        {"Search"}
                    </Text>
                </Link>
            </Tooltip>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onCloseDrawer}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search</DrawerHeader>

                    <DrawerBody>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <Input placeholder='Search here' ref={searchRef} onChange={handleInputChange} />
                            </FormControl>
                        </form>
                        {isLoading && (
                            <Flex align="center" justify="center" height="100%">
                                <Spinner color='red.500' />
                            </Flex>
                        )}
                        {!isLoading && hasSearched && users.length===0 && (
                            <Text>{"No result"}</Text>
                        )}
                        {!isLoading && users && users.map((user) => (
                            <SuggestedUser key={user.uid} suggestedUser={user} onCloseDrawer={onCloseDrawer}/>
                        ))}
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>

    )
}

export default Search
