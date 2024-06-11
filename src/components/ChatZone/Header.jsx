import React from 'react';
import styles from './chatzone.module.scss';
import classNames from 'classnames/bind';
import { Avatar, Text } from '@chakra-ui/react';
import { IoCloseOutline } from 'react-icons/io5';
import useChatStore from '~/stores/chatStore';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const Header = ({ userDoc, id }) => {
    const { deleteId } = useChatStore();
    const navigate = useNavigate();
    return (
        <div className={cx('header')}>
            <div className={cx('header-left')}>
                <Avatar
                    cursor={'pointer'}
                    onClick={() => {
                        navigate(`/profile/${userDoc.nickname}`);
                    }}
                    size={'sm'}
                    src={userDoc.avatarimage || '/noimage.jpg'}
                    alt={userDoc.name}
                />
                <Text
                    cursor={'pointer'}
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => {
                        navigate(`/profile/${userDoc.nickname}`);
                    }}
                >
                    {userDoc.name}
                </Text>
            </div>
            <div className={cx('header-right')} onClick={() => deleteId(id)}>
                <IoCloseOutline style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    );
};

export default Header;
