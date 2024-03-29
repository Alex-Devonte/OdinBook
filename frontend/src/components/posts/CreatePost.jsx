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
        <div className="container w-1/2 mx-auto bg-slate-600">
            <ToastContainer />
            <div className="flex flex-col ">
                <textarea
                    name="content"
                    cols="80"
                    rows="5"
                    placeholder="What do you wanna say?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border-2 border-black border-solid"
                >
                </textarea>  
            </div>
            <div className="flex justify-end p-2 text-gray-100 ">
                <button onClick={handleCreatePost}>Post</button>
            </div>
        </div>
    )
}

export default CreatePost;