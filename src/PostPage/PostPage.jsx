import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Post from '~/components/Post/Post';

const PostPage = () => {
    const { id } = useParams();
    console.log('postpage', id);
    const ref = useRef();
    useEffect(() => {
        if (ref && ref.current) {
            ref.current.click();
        }
    }, [ref]);
    return <Post id={id} ref={ref} />;
};

export default PostPage;
