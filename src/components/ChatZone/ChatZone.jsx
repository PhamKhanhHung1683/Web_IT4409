import React, { useEffect, useState } from 'react';
import styles from './chatzone.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import useAuthStore from '~/stores/authStore';
import { firestore } from '~/Firebase/Firebase';
const cx = classNames.bind(styles);
const ChatZone = ({ id }) => {
    const { user } = useAuthStore();
    const [friend, setFriend] = useState();
    console.log('id', id);
    useEffect(() => {
        const fetchChatData = async () => {
            //get user chat
            try {
                const userChatSnapShot = await getDoc(doc(firestore, 'userchats', user.uid));
                if (userChatSnapShot.exists()) {
                    console.log('userchat', userChatSnapShot.data());
                    let dt = userChatSnapShot.data();
                    setFriend(dt[id].userinfo);
                }
            } catch (error) {}
        };
        fetchChatData();
    }, [id]);
    return (
        <div className={cx('wrapper')}>
            {friend && <Header userDoc={friend} id={id} />}
            <Body id={id} />
            <Footer id={id} userDoc={friend} />
        </div>
    );
};

export default ChatZone;
