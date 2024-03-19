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
        <div>
            <Header />
            <div className='flex flex-col items-center'>
                <img
                    src={user.profilePicture}
                    className='w-56 rounded-full'
                />
                <button>Change Profile Picture</button>
            </div>
            <hr className='border-3 border-black w-full'/>
            <div>
                <p>Bio</p>
                <textarea cols='100' readOnly></textarea>
                <button>Edit Bio</button>
            </div>
            <hr className='border-3 border-black w-full'/>
            <div>
                <h1 className='text-6xl'>{user.firstName} {user.lastName}</h1>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' readOnly value={user.email} />
                <label htmlFor='password' name='password'>Password</label>
                <input type='password' name='password' readOnly value={user.password}/>
                <button>Change personal info</button>
                <Link to='/profile/edit' state={{section: 'personal'}}>Change personal info</Link>
            </div>
            <hr className='border-3 border-black w-full'/>
            <p>Account creation date: {formattedDate}</p>
            <Outlet></Outlet>
        </div>
    )
}

export default Profile;