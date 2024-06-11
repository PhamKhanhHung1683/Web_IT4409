import { Image, Text } from '@chakra-ui/react';
import React, { memo, useMemo } from 'react';
import styles from './chatzone.module.scss';
import classNames from 'classnames/bind';
import { getTimeDistance } from '~/assets/functions';
const cx = classNames.bind(styles);
const Message = ({ message, image, own, time }) => {
    const timeMemo = useMemo(() => {
        return getTimeDistance(time);
    }, [time]);
    return (
        <div className={cx('message-wrapper', { own })}>
            {message && (
                <div className={cx('message-container')}>
                    <div className={cx('message')}>{message && message}</div>
                    <Text order={own ? 1 : 2} fontSize={'xs'}>
                        {timeMemo}
                    </Text>
                </div>
            )}

            {image && (
                <div className={cx('image-container')}>
                    <Image order={own ? 2 : 1} w={'60%'} borderRadius={'15px'} src={image} />
                    <Text order={own ? 1 : 2} fontSize={'xs'}>
                        {timeMemo}
                    </Text>
                </div>
            )}
        </div>
    );
};

export default memo(Message);
