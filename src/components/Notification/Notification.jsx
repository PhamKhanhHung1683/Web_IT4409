import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import useFetchNotification from '~/hooks/useFetchNotification';
import FollowNotification from './FollowNotification';
import ReplyNotification from './ReplyNotification';
import CommentNotification from './CommentNotification';
import XONotification from './XONotification';

const Notification = ({ data }) => {
    const { loading, notifications } = useFetchNotification();

    return (
        <Flex minH={'50vh'} direction={'column'} w={'full'}>
            <Text fontSize={'lg'} fontWeight={500} color={'gray'}>
                Notifications
            </Text>
            {!loading && notifications.length > 0 && (
                <Flex height={'50vh'} overflowY={'scroll'} direction={'column'} gap={2} mt={2}>
                    {notifications.map((notification) => {
                        let NotificationItem;
                        switch (notification.type) {
                            case 'follow':
                                NotificationItem = FollowNotification;
                                break;
                            case 'reply':
                                NotificationItem = ReplyNotification;
                                break;
                            case 'comment':
                                NotificationItem = CommentNotification;
                                break;
                            case 'xo':
                                NotificationItem = XONotification;
                                break;
                            default:
                                NotificationItem = Box;
                                break;
                        }
                        return <NotificationItem key={notification.id} data={notification} />;
                    })}
                </Flex>
            )}
        </Flex>
    );
};

export default Notification;
