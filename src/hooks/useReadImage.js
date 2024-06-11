import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

const useReadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useToast();
    const handlerFileChange = (e) => {
        const maxFileSize = 2 * 1024 * 1024;
        const file = e.target.files[0];
        
        if (file && file.type.startsWith('image/')) {   
            if (file.size > maxFileSize) {
                toast({
                    title: 'Error',
                    description: 'Please input an image!',
                    status: 'error',
                });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast({
                title: 'Error',
                description: 'Please input an image!',
                status: 'error',
            });
            setSelectedFile(null);
            return;
        }
    };
    return { handlerFileChange, selectedFile,setSelectedFile };
};

export default useReadImage;
