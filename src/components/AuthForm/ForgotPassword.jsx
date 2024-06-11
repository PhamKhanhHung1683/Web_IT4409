import React, { useState } from 'react';
import { Button, Input, Box, Text } from '@chakra-ui/react';
import useForgotPassword from '~/hooks/useForgotPassword'; 

const ForgotPassword = ({ onCancel }) => {
    const [email, setEmail] = useState('');
    // const [message, setMessage] = useState('');
    const { forgotPassword } = useForgotPassword(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email); 
        } catch (error) {
            
        }
    };

    return (
        <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
                <Text mb={2}>Please enter your email address to search for your account:</Text>
                <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    mb={4}
                />
                
                <Button colorScheme="red" ml={3} onClick={onCancel}>Back</Button>
                <Button type="submit" ml={3} colorScheme="blue">Send</Button>
            </form>
            {/* {message && <Text mt={4}>{message}</Text>} */}
        </Box>
    );
};

export default ForgotPassword;