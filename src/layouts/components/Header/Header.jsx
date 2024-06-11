import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import Search from '../Search';
import Button from '~/components/Button';
import { CreateIcon } from '~/components/icons';
import { LogoutIcon } from '~/components/icons';
import { useModal } from '~/hooks';
import ModalWrapper from '~/components/ModalWrapper';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '~/firebase/firebase';
const cx = classNames.bind(styles);

function Header() {
    const [isShowing, toggle] = useModal();
    console.log(isShowing);
    const [showLogout, setShowLogout] = useState(false);

const handleAvatarClick = () => {
    setShowLogout(!showLogout);
};

// Logout function
const [ signOut] = useSignOut(auth);
const handleLogout = () => {
    // Add your logout logic here
    signOut();
    setShowLogout(false);
};


    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Image src={images.logo} alt="Logo" className={cx('logo-img')} />
                <span className={cx('title')}>Flash</span>
            </div>
            <div className={cx('action')}>
                <Search />
                <Button onClick={() => toggle()} iconLeft={<CreateIcon />}>
                    Create
                </Button>
                
                <ModalWrapper isShowing={isShowing} hide={toggle} title={"Tạo bài viết"} >MyAccount</ModalWrapper>
                <div style={{ display: 'flex', alignItems: 'center' }}>
    <Image
        round
        className={cx('avartar')}
        src={'your-avatar-url'}
        alt={'avartar'}
        onClick={handleAvatarClick}
    />
    {showLogout && (
        <Button onClick={handleLogout} iconLeft={<LogoutIcon />} style={{backgroundColor:"#EE0000"}}>
            Log Out
        </Button>
    )}
</div>
                
            </div>
        </div>
    );
}

export default Header;
