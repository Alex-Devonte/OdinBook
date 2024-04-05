import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { respondToFollowRequest } from '../../features/user/userSlice';

function FollowList() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const followers = user.followers;
    const following = user.following;
    useEffect(() => {
        console.log(user)   ;
        
    }, [user]);

    const respondToRequest = (e, followerID) => {
        const userResponse = e.target.value;
        const userData = {userResponse, followerID};
        dispatch(respondToFollowRequest(userData));
    }


    return (
        <div className='border-2 border-red-600'>
            {followers?.length === 0 ? (
                <p>No followers yet</p>
            ) : (
                <ul>
                    {followers && followers.map((follower, i) => {
                        if (follower.status === 'pending') {
                            return (
                                <li key={i}>
                                    {follower.status} {follower.user?.firstName}
                                    <button onClick={(e) => respondToRequest(e, follower.user)} value='accepted'>Accept</button> 
                                    <button onClick={(e) => respondToRequest(e, follower.user)} value='denied'>Deny</button>
                                </li>
                               
                            )
                        } else if (follower.status === 'accepted') {
                           return (<li key={i}> {follower.status} {follower.user?.firstName}</li>)
                        }
                    })}
                </ul>
            )}
            <hr />
            {following?.length === 0 ? (
                <p>Not following anyone yet</p>
            ) : (
                <ul>
                    {following && following.map((follow, i) => {
                        return (
                            <li key={i}>
                                {follow.user?.firstName} <br/>
                            </li>
                        )       
                    })}
                </ul>
            )}
        </div>
    )
}

export default FollowList;