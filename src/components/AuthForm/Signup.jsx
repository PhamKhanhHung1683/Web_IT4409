import {
    Alert,
    AlertDescription,
    AlertIcon,
    Button,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { HidePasswordIcon, ShowPasswordIcon } from '~/assets/constant';
import useSignUpWithEmailAndPassword from '~/hooks/useSignUpWithEmailAndPassword';

const Signup = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        nickname: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error, signup } = useSignUpWithEmailAndPassword();
    console.log('input', inputs);
    return (
        <>
            <Input
                placeholder="Nickname (do not include '@')"
                focusBorderColor="green.700"
                type="text"
                value={inputs.nickname}
                size="sm"
                onChange={(e) => setInputs((prev) => ({ ...prev, nickname: e.target.value }))}
            />
            <Input
                placeholder="User name"
                focusBorderColor="green.700"
                type="text"
                value={inputs.name}
                size="sm"
                onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
            />
            <Input
                placeholder="Email"
                focusBorderColor="green.700"
                type="email"
                value={inputs.email}
                size="sm"
                onChange={(e) => setInputs((prev) => ({ ...prev, email: e.target.value }))}
            />
            <InputGroup borderColor={'gray'}>
                <Input
                    focusBorderColor={'green.700'}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={inputs.password}
                    size="sm"
                    onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
                />
                <InputRightElement width="2rem" display={'flex'} h={'full'} alignItems={'center'}>
                    <Button
                        size="xs"
                        _hover={{ bg: 'transparent', color: 'black', transform: 'scale(1.05)' }}
                        variant={'ghost'}
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <InputGroup borderColor={'gray'}>
                <Input
                    focusBorderColor={'green.700'}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={inputs.confirmPassword}
                    size="sm"
                    onChange={(e) => setInputs((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                />
                <InputRightElement width="2rem" display={'flex'} h={'full'} alignItems={'center'}>
                    <Button
                        size="xs"
                        _hover={{ bg: 'transparent', color: 'black', transform: 'scale(1.1)' }}
                        variant={'ghost'}
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Button isLoading={loading} colorScheme={'green'} onClick={()=>signup(inputs)}>
                Sign up
            </Button>
            {error && (
                <Alert w={"full"} status="error">
                    <AlertIcon />
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}
        </>
    );
};

export default Signup;
