import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/user/userSlice';
import { sendFollowRequest } from '../../features/user/userSlice';
import { useEffect } from 'react';

function DiscoverUsers() {
    const dispatch = useDispatch();
    const {users, isLoading, isError, isSuccess, message} = useSelector((state) => state.user);
    const currentUserID = useSelector((state) => state.auth.user._id);

    useEffect(() => {
        dispatch(getUsers());  
    }, [dispatch]);

    const sendRequest = (userID) => {
        dispatch(sendFollowRequest(userID));
    };

    return (
        <div className='bg-slate-300 rounded-lg p-5 mx-5'>
            <h1 className='text-2xl mb-5'>Discover Users</h1>
            {users.length === 0 && <p>Currently no users to discover</p>}
            {users.map((user, i) => {
                //Check if user already exists in the followers array
                const isRequestSent = user.followers.some(follower => follower.user === currentUserID);
                
                return (
                    <div key={i} className='flex justify-between my-5'>
                        <div className='flex items-center p-2'>
                            <img className='flex justify-center w-20 rounded-full' src={user.profilePicture} />
                        </div>
                        <div className='flex items-center p-2'>
                            <p className='text-lg'>{user.firstName + ' ' + user.lastName}</p>
                        </div>
                        <div className='flex items-center p-2'>
                            {/* If request is already sent, show 'Request Sent' */}
                            {isRequestSent ? (
                                <button disabled className='bg-odin-gold text-white p-2 rounded-xl opacity-35 w-44 h-10'>Request Sent</button>
                            ) : (
                                <button onClick={() => sendRequest(user._id)} className='bg-odin-gold text-white p-2 rounded-xl cursor-pointer w-44 h-10'>Send Friend Request</button>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default DiscoverUsers;