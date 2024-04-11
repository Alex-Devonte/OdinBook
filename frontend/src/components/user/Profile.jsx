import { useSelector } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';
import Header from '../Header'

function Profile() {
    const {user} = useSelector((state) => state.auth);
     
    //Send user to login page if they aren't logged in
    if (user === null) {
        return <Navigate to='/login' state={{type: 'auth', message: 'You must be logged in to access your profile'}}/>;
    }

    const formattedDate = new Date(user.dateCreated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return (
        <div className=' '>
            <Header />
            <div className='flex flex-col items-center mt-10'>
                <img
                    src={user.profilePicture}
                    className='w-44 md:w-64 rounded-full mb-5'
                />
                <button className='bg-slate-700 text-white p-2 rounded-md mb-5 shadow-md'>Change Profile Picture</button>
            </div>
            <div className='p-5 md:flex flex-col  md:w-1/4 md:mx-auto'>
                <h2 className='text-2xl font-bold md:hidden'>Bio</h2>
                <div className='flex flex-col'>
                    <textarea cols='100' readOnly className='border-2 my-6'></textarea>
                    <button className='self-start bg-slate-700 text-white p-2 rounded-md mb-5 shadow-md'>Edit Bio</button>
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
            <Outlet></Outlet>
        </div>
    )
}

export default Profile;