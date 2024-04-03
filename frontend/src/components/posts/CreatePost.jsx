import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../features/posts/postSlice.js';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost() {

    const [content, setContent] = useState();
    const dispatch = useDispatch();
    const {fieldErrors} = useSelector((state) => state.posts);

    useEffect(() => {
        if (fieldErrors) {
            toast.error(fieldErrors.content);
        }
    }, [fieldErrors]);

    const handleCreatePost = () => {
        dispatch(createPost({content}));
        setContent('');
    }

    return (
        <div className='container w-1/3 mx-auto bg-slate-300 p-3 rounded-md'>
            <ToastContainer />
            <div className='flex'>
                <textarea
                    name='content'
                    rows='1'
                    placeholder='What do you wanna say?'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='resize-none flex-1 rounded-lg p-2 focus:outline-odin-gold'
                >
                </textarea> 
                <button onClick={handleCreatePost} className='bg-odin-gold text-white rounded-md p-1 ml-3 w-14'>Post</button>
            </div>
        </div>
    )
}

export default CreatePost;