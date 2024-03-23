import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/user/userSlice';
import { sendFollowRequest } from '../../features/social/socialSlice';
import { useEffect } from 'react';

function DiscoverUsers() {
    const dispatch = useDispatch();
    const {users, isLoading, isError, isSuccess, message} = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUsers());  
    }, [dispatch]);

    const sendRequest = (userID) => {
        dispatch(sendFollowRequest(userID));
    };

    return (
        <div>
            <h1>Discover Users</h1>
            {users.map((user, i) => {
                return (
                    <div key={i} className="border border-black">
                        <p>{user.firstName + ' ' + user.lastName}</p>
                        <img className='w-10 rounded-full' src={user.profilePicture} />
                        <button onClick={() => sendRequest(user._id)}>Send Friend Request</button>
                    </div>
                )
            })}
        </div>
    )

}

export default DiscoverUsers;