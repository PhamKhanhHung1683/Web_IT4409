import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './chatzone.module.scss';
import Message from './Message';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '~/Firebase/Firebase';
import useAuthStore from '~/stores/authStore';
const cx = classNames.bind(styles);

const Body = ({ id }) => {
    const [messages, setMessages] = useState([]);
    const { user } = useAuthStore();
    const ref = useRef();
    useEffect(() => {
        let unsub;
        const fetchMessage = async () => {
            unsub = onSnapshot(doc(firestore, 'chats', id), (messageSnapshot) => {
                setMessages(messageSnapshot.data().messages);
            });
        };
        fetchMessage();
        return () => {
            unsub();
        };
    }, [id]);
    useEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [messages]);
    return (
        <div className={cx('body')} ref={ref}>
            {messages &&
                messages.map((element) => (
                    <Message
                        message={element.content}
                        key={element.id}
                        own={element.from === user.uid}
                        image={element.imageurl}
                        time={element.time}
                    />
                ))}
            {messages.length === 0 && 'Start conversation'}
        </div>
    );
};

export default Body;
