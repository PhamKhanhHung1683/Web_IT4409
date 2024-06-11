import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    Image,
    Input,
    Select,
    Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdArrowDropDown } from 'react-icons/md';
import { ScreenContext } from '~/contexts/ScreenContext';
import useReadImage from '../../hooks/useReadImage';
import useEditProfile from '../../hooks/useEditProfile';
// const userDoc = {
//     uid: userCredential.user.uid,
//     email: inputs.email,
//     backgroundimage: '',
//     avatarimage: '',
//     nickname: inputs.nickname,
//     name: inputs.name,
//     bio: '',
//     location: '',
//     website: '',
//     birthday: '',
//     joinedat: Date.now(),
//     following: [],
//     follower: [],
//     posts: [],
// };
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const days = Array.from({ length: 31 }, (v, i) => i + 1);

const ProfileForm = ({ userProfile, onClose }) => {
    const { width } = useContext(ScreenContext);
    const backgroundRef = useRef(null);
    const avatarRef = useRef(null);
    const {isUpdating,editProfile} =useEditProfile()
    const [inputs, setInputs] = useState({
        name:userProfile.name,
        bio:userProfile.bio,
        location:userProfile.location,
        website:userProfile.website
    });
    const {selectedFile : backgroundImage, handlerFileChange : handlerBackgroundImageChange} = useReadImage();
    const {selectedFile : avatarImage, handlerFileChange : handleravatarImageChange} = useReadImage();
    const initDate = useMemo(() => {
        if (userProfile.birthday === '') {
            return {
                year: '',
                month: '',
                day: '',
            };
        } else {
            const birthday = new Date(userProfile.birthday);
            return { year: birthday.getFullYear(), month: months[birthday.getMonth()], day: birthday.getDate() };
        }
    }, []);
    const [date, setDate] = useState(initDate);
    const [error, setError] = useState(null);
    const handlerSubmit = () => {
        //check
        const inputDate = new Date(`${date.month} ${date.day} ${date.year}`);
        let birthday=`${date.month} ${date.day} ${date.year}`
        if (
            inputDate == 'Invalid Date' ||
            inputDate.getFullYear() !== Number(date.year) ||
            months[inputDate.getMonth()] !== date.month ||
            inputDate.getDate() !== Number(date.day)
        ) {
            if(!(date.year===""&&date.month===""&&date.day==="")){
                //invalid date
            setError('Invalid Date!');
            return;
            }
            birthday="";

        }
        if (inputs.name === '') {
            //invalid date
            setError('Name is required');
            return;
        }
        setError(null); 
        editProfile(inputs,backgroundImage,avatarImage,birthday);
        onClose();
    };

    //day month year list
    const years = useMemo(() => {
        const now = new Date();
        const maxyear = now.getFullYear();
        const minyear = maxyear - 100;
        const listYears = [];
        for (let i = maxyear; i >= minyear; i--) {
            listYears.push(i);
        }
        return listYears;
    }, []);
    return (
        <Flex direction={'column'}>
            {/* background input */}
            {/* background image */}
            <Box w={'full'} position={'relative'}>
                <Box
                    position={'absolute'}
                    p={{ base: 2, md: 3 }}
                    borderRadius={9999}
                    _hover={{ transform: ' translate(-50%,-50%) scale(1.05)' }}
                    cursor={'pointer'}
                    _active={{ transform: ' translate(-50%,-50%) scale(0.9)' }}
                    backgroundColor={'rgba(0,0,0,0.4)'}
                    top={'50%'}
                    transition={'0.07s ease-in-out'}
                    left={'50%'}
                    transform={'translate(-50%,-50%)'}
                    onClick={() => backgroundRef.current.click()}
                >
                    <FiEdit3 size={'33px'} color="white" strokeWidth="1.3" />
                    
                    <Input onChange={handlerBackgroundImageChange}  ref={backgroundRef} type="file" hidden />
                </Box>
                <Image
                    borderTopRadius={15}
                    src={backgroundImage||(userProfile?.backgroundimage ? userProfile?.backgroundimage : '/noImage.jpg')}
                    alt={'background image'}
                    h={{ base: width / 2.7 + 'px', md: '240px' }}
                    w={'full'}
                    objectFit={'cover'}
                />
            </Box>
            {/* avartar */}
            <Box
                transition={'0.07s ease-in-out'}
                w={'max-content'}
                position={'relative'}
                mt={{ base: '-' + width / 7.6 + 'px', md: '-83px' }}
                ml={'4%'}
                zIndex={2}
            >
                <Box
                    w={'max-content'}
                    position={'absolute'}
                    top={'50%'}
                    left={'50%'}
                    transform={'translate(-50%,-50%)'}
                    p={{ base: 2, md: 3 }}
                    borderRadius={9999}
                    _hover={{ transform: 'translate(-50%,-50%) scale(1.05)' }}
                    cursor={'pointer'}
                    _active={{ transform: 'translate(-50%,-50%) scale(0.9)' }}
                    backgroundColor={'rgba(0,0,0,0.4)'}
                    onClick={() => avatarRef.current.click()}
                >
                    <FiEdit3
                        size={width < 600 ? '10px' : width < 800 ? '15px' : '20px'}
                        color="white"
                        strokeWidth="1.3"
                    />
                    <Input ref={avatarRef}  onChange={handleravatarImageChange} type="file" hidden />
                </Box>
                <Box
                    borderRadius={999999}
                    h={{ base: width / 3.8 + 'px', md: '140px' }}
                    w={{ base: width / 3.8 + 'px', md: '140px' }}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Image
                        src={avatarImage||(userProfile?.avatarimage ? userProfile?.avatarimage : '/avatar.jpg')}
                        alt={'avatar image'}
                        
                        objectFit={'cover'}
                        h={{ base: width / 4 + 'px', md: '140px' }}
                        w={{ base: width / 4 + 'px', md: '140px' }}
                        borderRadius={999999}
                    />
                </Box>
            </Box>

            {/* some field */}
            <Text fontWeight={500} mt={4} mb={2}>
                Name
            </Text>
            <Input
                placeholder="Name"
                focusBorderColor="green.700"
                value={inputs.name}
                py={{ base: 2, md: 4 }}
                onChange={(e) =>
                    setInputs((prev) => {
                        setError(null);
                        return { ...prev, name: e.target.value };
                    })
                }
            />
            <Text fontWeight={500} mt={4} mb={2}>
                Bio
            </Text>

            <Input
                placeholder="Bio"
                focusBorderColor="green.700"
                value={inputs.bio}
                py={{ base: 2, md: 4 }}
                onChange={(e) =>
                    setInputs((prev) => {
                        setError(null);
                        return { ...prev, bio: e.target.value };
                    })
                }
            />
            <Text fontWeight={500} mt={4} mb={2}>
                Location
            </Text>
            <Input
                placeholder="Location"
                focusBorderColor="green.700"
                value={inputs.location}
                py={{ base: 2, md: 4 }}
                onChange={(e) =>
                    setInputs((prev) => {
                        setError(null);
                        return { ...prev, location: e.target.value };
                    })
                }
            />
            <Text fontWeight={500} mt={4} mb={2}>
                Website
            </Text>
            <Input
                placeholder="Website"
                focusBorderColor="green.700"
                value={inputs.website}
                py={{ base: 2, md: 4 }}
                onChange={(e) =>
                    setInputs((prev) => {
                        setError(null);
                        return { ...prev, website: e.target.value };
                    })
                }
            />
            <Text fontWeight={500} mt={4} mb={2}>
                Birthday
            </Text>
            <Flex gap={{ base: 4, md: 6 }}>
                <Select
                    flex={2}
                    icon={<MdArrowDropDown />}
                    placeholder="Year"
                    onChange={(e) =>
                        setDate((prev) => {
                            setError(null);
                            return { ...prev, year: e.target.value };
                        })
                    }
                >
                    {years &&
                        years.map((element) => (
                            <option key={element} value={element}>
                                {element}
                            </option>
                        ))}
                </Select>
                <Select
                    flex={1}
                    icon={<MdArrowDropDown />}
                    placeholder="Month"
                    onChange={(e) =>
                        setDate((prev) => {
                            setError(null);
                            return { ...prev, month: e.target.value };
                        })
                    }
                >
                    {months.map((element) => (
                        <option value={element} key={element}>
                            {element}
                        </option>
                    ))}
                </Select>
                <Select
                    flex={1}
                    icon={<MdArrowDropDown />}
                    placeholder="Day"
                    onChange={(e) =>
                        setDate((prev) => {
                            setError(null);
                            return { ...prev, day: e.target.value };
                        })
                    }
                >
                    {days.map((element) => (
                        <option value={element} key={element}>
                            {element}
                        </option>
                    ))}
                </Select>
            </Flex>
            {error!==null && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Button
                alignSelf={'flex-end'}
                size={'lg'}
                colorScheme="green"
                variant={'ghost'}
                mr={3}
                onClick={handlerSubmit}
                isLoading={isUpdating}
            >
                Save
            </Button>
        </Flex>
    );
};

export default ProfileForm;
