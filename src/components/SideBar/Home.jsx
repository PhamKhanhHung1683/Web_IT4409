import { Link, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { Link as RouterLink } from 'react-router-dom';
import UsePostStore from '~/stores/postStore';
const Home = ({ width }) => {
    const { setpostlist } = UsePostStore();
    return (
        <Tooltip hasArrow placement="right" label={'Home'} display={{ base: 'block', md: 'none' }}>
            <Link
                _active={{ transform: 'scale(1.2)' }}
                display={'flex'}
                gap={2}
                alignItems={'center'}
                as={RouterLink}
                justifyContent={{ base: 'center', md: 'flex-start' }}
                borderRadius={6}
                padding={{ base: 1, md: 3 }}
                to={'/'}
                _hover={{ bg: 'blackAlpha.200' }}
            >
                {<BiHomeAlt2 size={width < 400 ? 22 : 33} />}
                <Text display={{ base: 'none', md: 'block' }}>{'Home'}</Text>
            </Link>
        </Tooltip>
    );
};

export default Home;
