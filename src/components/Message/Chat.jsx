import ReactDOM from 'react-dom';
import React from 'react';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import useChatStore from '~/stores/chatStore';
import { Avatar } from '@chakra-ui/react';
import ChatZone from '../ChatZone/ChatZone';
import ChatBubble from './ChatBubble';
const cx = classNames.bind(styles);
const Chat = () => {
    const { chatIds, pushId, deleteId, setChatIds } = useChatStore();
    console.log('chatids', chatIds);
    const chatData = {
        userinfo: {
            avatarimage: '/noimage.jpg',
            name: 'Thanh nguyen',
        },
        message: [
            {
                from: 'id2',
                createdat: 'now',
                content: 'Xin chao minh la chao day',
            },
            {
                from: 'id2',
                createdat: 'now',
                content: 'Xin chao minh la chao day',
            },
            {
                from: 'id2',
                createdat: 'now',
                content: 'Xin chao minh la chao day',
            },
            {
                from: 'id2',
                createdat: 'now',
                content: 'Xin chao minh la chao day',
            },
        ],
    };
    return ReactDOM.createPortal(
        <div className={cx('wrapper')}>
            <div className={cx('container1')}>
                {chatIds && chatIds.length > 0 && <ChatZone id={chatIds[chatIds.length - 1]} />}
                {chatIds && chatIds.length > 1 && <ChatZone id={chatIds[chatIds.length - 2]} />}
            </div>
            <div className={cx('container2')}>
                {chatIds.map((element, index) => {
                    if (index >= chatIds.length - 2) return '';
                    else return <ChatBubble id={element} index={index} />;
                })}
            </div>
        </div>,
        document.querySelector('body'),
    );
};

export default Chat;
