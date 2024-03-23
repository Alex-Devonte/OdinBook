import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { respondToFollowRequest } from '../../features/social/socialSlice';

function FollowList() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const followers = user.followers;
    const following = user.following;
    useEffect(() => {
        console.log(user)   ;
        
        console.log(following);
    }, [user]);

    const respondToRequest = (e, followerID) => {
        const userResponse = e.target.value;
        const userData = {userResponse, followerID};
        dispatch(respondToFollowRequest(userData));
    }


    return (
        <div className='border-2 border-red-600'>
            {user.firstName}
            <h1>Follow List</h1>
            {followers?.length === 0 ? (
                <p>No Followers Yet</p>
            ) : 
            (
                <ul>
                    {followers.map((follower, i) => {
                        if (follower && follower.status === 'pending') {
                                return (
                                    <li key={i}>
                                        {follower.status} ---- {follower._id} <br/>
                                        <button onClick={(e) => respondToRequest(e, follower._id)} value='accepted'>Accept</button>
                                        <button onClick={(e) => respondToRequest(e, follower._id)} value='denied'>Deny</button>
                                    </li>
                                )
                        } else if (follower && follower.status === 'accepted') {
                            return (
                                <li key={i}>
                                    {follower.status} --- {follower._id}
                                </li>
                            )
                        }
                       
                    })}
                </ul>
            )}
            {following?.length === 0 ? (
                <p>Not following anyone</p>
            ) :
            (
                <ul>
                    {following.map((follow, i) => {
                        return (
                            <li key={i}>
                                {follow} <br/>
                            </li>
                        )        
                    })}          
                </ul>
            )}
        </div>
    )
}

export default FollowList;