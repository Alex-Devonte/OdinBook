import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/user/userSlice';
import { useEffect } from 'react';

function DiscoverUsers() {
    const dispatch = useDispatch();
    const {users, isLoading, isError, isSuccess, message} = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUsers());  
    }, [dispatch]);

    return (
        <div>
            <h1>Discover Users</h1>
            {users.map((user, i) => {
                return (
                    <div key={i} className="border border-black">
                        <p>{user.firstName + ' ' + user.lastName}</p>
                        <img className='w-10 rounded-full' src={user.profilePicture} />
                        <button>Send Friend Request</button>
                    </div>
                )
            })}
        </div>
    )

}

export default DiscoverUsers;