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
        <div className='bg-slate-300 rounded-lg overflow-y-scroll h-96 md:overflow-y-auto md:h-auto md:ml-8'>
            <h1 className='text-2xl mb-5 shadow-md sticky top-0 bg-slate-500 text-white p-3 rounded-sm md:static'>Discover Users</h1>
            {users.length === 0 && <p>Currently no users to discover</p>}
            {users.map((user, i) => {
                //Check if user already exists in the followers array
                const isRequestSent = user.followers.some(follower => follower.user === currentUserID);
                
                return (
                    <div key={i} className='flex justify-between my-5 p-3'>
                        <div className='flex items-center gap-5 w-full'>
                            <img className='flex justify-center w-20 rounded-full' src={user.profilePicture} />
                            <p className='text-lg'>{user.firstName + ' ' + user.lastName}</p>
                        </div>
                        <div className='flex items-center '>
                            {/* If request is already sent, show 'Request Sent' */}
                            {isRequestSent ? (
                                <button disabled className='bg-slate-700 text-white p-2 shadow-md rounded-xl opacity-35 w-44 h-10 '>Request Sent</button>
                            ) : (  
                                <button onClick={() => sendRequest(user._id)} className='bg-slate-700 text-white p-2 shadow-md rounded-xl cursor-pointer w-44 h-10 transition duration-100 ease-linear hover:bg-odin-gold active:bg-odin-gold'>Send Friend Request</button>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default DiscoverUsers;