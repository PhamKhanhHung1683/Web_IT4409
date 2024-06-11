import { Box, Container, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import AuthForm from '~/components/AuthForm/AuthForm';

const AuthPage = () => {
    return (
        <Flex justifyContent={'center'} bg={'transparent'}>
            <Container maxW={'container.xl'} bg={'transparent'}>
                <Flex
                    gap={10}
                    justifyContent={{ base: 'center', md: 'start' }}
                    alignItems={'center'}
                    w={'full'}
                    h={'100vh'}
                >
                    <Box display={{ base: 'none', md: 'block' }}>
                        <Image src="/login.png" alt="Login" h={600} />
                    </Box>
                    <AuthForm />
                </Flex>
            </Container>
        </Flex>
    );
};

export default AuthPage;
