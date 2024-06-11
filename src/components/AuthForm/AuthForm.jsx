import React, { useState } from 'react';
import { VStack, Flex, Text, Box } from '@chakra-ui/react';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import GoogleAuth from './GoogleAuth';
import Logo from '../Logo/Logo';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const toggleForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    return (
        <VStack alignItems={'stretch'}>
            <VStack border={'1px solid gray'} alignItems={'stretch'} borderRadius={4} padding={5} spacing={3}>
                {!showForgotPassword && <Logo />}
                {showForgotPassword ? (
                    <ForgotPassword
                        onCancel={() => {
                            setShowForgotPassword(false);
                            setIsLogin(true);
                        }}
                    />
                ) : isLogin ? (
                    <>
                        <Login />
                        <Text cursor={'pointer'} color={'blue.900'} onClick={toggleForgotPassword}>
                            Forgot Password?
                        </Text>
                    </>
                ) : (
                    <Signup />
                )}

                {isLogin && !showForgotPassword && (
                    <Flex alignItems={'center'} gap={2} my={1}>
                        <Box h={0.3} flex={1} bg={'gray.600'}></Box>
                        <Text>Or</Text>
                        <Box h={0.3} flex={1} bg={'gray.600'}></Box>
                    </Flex>
                )}

                {isLogin && !showForgotPassword && <GoogleAuth />}
            </VStack>
            {!showForgotPassword && (
                <Flex justifyContent={'center'} mt={4} border={'1px solid gray'} py={5} px={6} borderRadius={1}>
                    {isLogin ? (
                        <Text cursor={'default'}>
                            Don't have an account?{' '}
                            <span style={{ color: 'green', cursor: 'pointer' }} onClick={() => setIsLogin(false)}>
                                Sign up
                            </span>
                        </Text>
                    ) : (
                        <Text cursor={'default'}>
                            Already have an account?{' '}
                            <span onClick={() => setIsLogin(true)} style={{ color: 'green', cursor: 'pointer' }}>
                                Log in
                            </span>
                        </Text>
                    )}
                </Flex>
            )}
        </VStack>
    );
};

export default AuthForm;
