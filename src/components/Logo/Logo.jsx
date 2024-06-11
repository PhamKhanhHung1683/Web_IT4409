import {  Text, VStack } from '@chakra-ui/react';
import React from 'react';
import classnames from 'classnames/bind';
import styles from './Logo.module.scss';

const cx = classnames.bind(styles);
const Logo = ({ sm = false, dark = false,responsive=false,full=false,...props }) => {
    return (
        <VStack
            className={cx('wrapper', {
                sm,
                dark,
                responsive,full
            })
        
    } {...props}
        >
            <Text className={cx('logo')}>FLASH</Text>
            <Text className={cx('banner')} >
                Together we make everything better
            </Text>
        </VStack>
    );
};

export default Logo;
