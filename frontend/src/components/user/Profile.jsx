import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from '../Header'
import { useState } from 'react';
import { updateBio, uploadProfilePicture } from '../../features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';

function Profile() {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [bio, setBio] = useState(user.bio);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [fileData, setFileData] = useState({file: '', fileName:'', extension:''});

    //Send user to login page if they aren't logged in
    if (user === null) {
        return <Navigate to='/login' state={{type: 'auth', message: 'You must be logged in to access your profile'}}/>;
    }

    const formattedDate = new Date(user.dateCreated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleChange = (e) => {
        setBio(prevBio => e.target.value);
    }

    const handleCancel = () => {
        setEditMode(false);
        setBio(user.bio)
    }

    const handleEditBio = () => {
        setEditMode(true);
    };

    const handleSubmit = () => {
        dispatch(updateBio({updatedBio: bio}));
        setEditMode(false);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        //Check if file is selected
        if (file) {
            //Extract file name and extension
            const fileName = file.name;
            const extension = fileName.split('.').pop().toLowerCase();

            //Check if file is image with jpg or png extension
            if (file.type.startsWith('image/') && extension === 'jpg' || extension === 'png') {
                const reader = new FileReader();

                reader.onload = () => {
                    //Set profile picture to url of image after it has been read
                    setProfilePicture(reader.result);
                };
        
                //Read file contents and grab the URL
                reader.readAsDataURL(file);
                setFileData({file, fileName, extension});
            }
           
        } else {
            toast.error('Only file types of jpg or png are allowed');
        }    
    }

    const handleUpload = () => {
        //Check if uploaded picture is different from the original
        if (fileData.file && profilePicture !== user.profilePicture) { 
            const formData = new FormData();
            const updatedFileData = {...fileData, imageURL: profilePicture};
            setFileData(updatedFileData); 

            formData.append('file', fileData.file);
            formData.append('extension', fileData.extension);

            dispatch(uploadProfilePicture(formData));
        }
    }
    
    return (
        <div className=' '>
            <Header />
            <ToastContainer />
            <div className='flex flex-col items-center mt-10'>
                <img
                    src={profilePicture || user.profilePicture}
                    className='w-44 md:w-64 rounded-full mb-5'
                />
                <div className='flex flex-col'> 
                    <input type='file' accept='image/jpeg, image/png' onChange={handleFileChange} className='bg-slate-700 text-white p-1 rounded-md mb-5 shadow-md'/>
                    <button onClick={handleUpload} className='bg-slate-700 text-white p-2 rounded-md mb-5 shadow-md transition duration-100 ease-linear hover:bg-odin-gold active:bg-odin-gold'>Change Profile Picture</button>
                </div>
            </div>
            <div className='p-5 md:flex flex-col  md:w-1/4 md:mx-auto'>
                <h2 className='text-2xl font-bold md:hidden'>Bio</h2>
                <div className='flex flex-col'>
                    <textarea cols='100' name='bio' readOnly={!editMode ? true : false} onChange={handleChange} value={bio} className='border-2 border-slate-600 my-6 p-1 read-only:bg-slate-400 read-only:text-white'></textarea>
                    {editMode ? (
                            <div className='flex justify-between'>
                                <button onClick={handleSubmit} className='self-start bg-slate-700 text-white p-2 rounded-md mb-5 shadow-md transition duration-100 ease-linear hover:bg-odin-gold active:bg-odin-gold'>Update Bio</button>
                                <button onClick={handleCancel} className='self-start bg-slate-700 text-white p-2 rounded-md mb-5 shadow-md transition duration-100 ease-linear hover:bg-odin-gold active:bg-odin-gold'>Cancel</button>
                            </div>
                        ) : (
                            <button onClick={handleEditBio} className='self-start bg-slate-700 text-white p-2 rounded-md mb-5 shadow-md transition duration-100 ease-linear hover:bg-odin-gold active:bg-odin-gold'>Edit Bio</button>
                        )}                           
                </div>
            </div>
            <div className='flex flex-col my-10'>
                <div className='flex flex-col p-5 md:w-1/4 md:mx-auto'>
                <h2 className='text-2xl font-bold mb-5 md:hidden'>Personal Info</h2>
                    <div className='mb-8'>
                        <h1 className='text-6xl font-bold'>{user.firstName} {user.lastName}</h1>
                    </div>
                    <div className='flex items-center justify-between mb-3'>
                        <label htmlFor='email' className='font-bold text-lg'>Email: </label>
                        <input type='email' name='email' readOnly value={user.email} className='bg-slate-400 border-2 border-slate-600 p-1' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <label htmlFor='password' name='password' className='font-bold text-lg'>Password: </label>
                        <input type='password' name='password' readOnly value={user.password} className='bg-slate-400 border-2 border-slate-600 p-1'/>
                    </div>
                </div>
            </div>
            <div className='p-5 mt-5 flex justify-center'>
                <p className='font-bold text-slate-400'>Account creation date: {formattedDate}</p>
            </div>
        </div>
    )
}

export default Profile;