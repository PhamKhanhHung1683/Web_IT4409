import { Flex, Spinner, Link, Text, Tooltip, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineExplore } from 'react-icons/md'
import SuggestedUser from '../SuggestedUser/SuggestedUser'
import useSuggestUsers from '~/hooks/useSuggestUsers';
import useAuthStore from '../../stores/authStore';

const Explore = ({ width }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const { isLoading, users, getSuggestUsers } = useSuggestUsers();

  useEffect(() => {
    getSuggestUsers();
  }, []);

  const onCloseDrawer = () => {
    onClose();
  };

  return (
    <>
      {/* console.log(getSuggestUsers); */}
      <Tooltip
        hasArrow
        placement="right"
        label={"Explore"}
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
          onClick={onOpen}
        >
          {<MdOutlineExplore size={width < 400 ? 22 : 33} />}
          <Text display={{ base: 'none', md: 'block' }}>{'Explore'}</Text>

        </Link>
      </Tooltip>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Suggest another account</DrawerHeader>

          <DrawerBody>
            {isLoading && (
              <Flex align="center" justify="center" height="100%">
                <Spinner color='red.500' />
              </Flex>
            )}
            {!isLoading && users && users.length === 0 && (
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

export default Explore