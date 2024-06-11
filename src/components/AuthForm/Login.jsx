import { Alert, AlertDescription, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { HidePasswordIcon, ShowPasswordIcon } from '~/assets/constant';
import useLogin from '~/hooks/useLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const { loginWithEmailAndPassword, error, loading } = useLogin();
    return (
        <>
            <Input
                focusBorderColor="green.700"
                placeholder="Email"
                type="email"
                value={inputs.email}
                onChange={(e) => setInputs((prev) => ({ ...prev, email: e.target.value }))}
            />
            <InputGroup size="md" borderColor={'gray'}>
                <Input
                    focusBorderColor="green.700"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={inputs.password}
                    onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
                />
                <InputRightElement width="3rem" display={'flex'} h={'full'} alignItems={'center'}>
                    <Button
                        size="xs"
                        variant={'ghost'}
                        _hover={{ bg: 'transparent', color: 'black', transform: 'scale(1.05)' }}
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button isLoading={loading} colorScheme={'green'} onClick={() => loginWithEmailAndPassword(inputs)}>
                Log in
            </Button>
            {!loading && error && (
                <Alert w={'full'} status="error">
                    <AlertIcon />
                    <AlertDescription>{error.code}</AlertDescription>
                </Alert>
            )}
        </>
    );
};

export default Login;
