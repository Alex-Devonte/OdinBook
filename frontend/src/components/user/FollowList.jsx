import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { respondToFollowRequest } from '../../features/user/userSlice';
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';


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
        <div className='bg-slate-200 mx-5'>
            <Tabs defaultValue={1}>
                <TabsList className="mb-4 bg-slate-400 flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg">
                    <Tab slotProps={{
                        root: ({ selected, disabled }) => ({
                            className: `font-sans ${
                                selected
                                ? 'text-white bg-slate-500'
                                : 'text-white bg-transparent focus:text-white hover:bg-slate-300'
                            } ${
                                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                            } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
                        }),
                    }}
                        value={1}>Followers
                    </Tab>
                    <Tab slotProps={{
                        root: ({ selected, disabled }) => ({
                            className: `font-sans ${
                                selected
                                ? 'text-white bg-slate-500'
                                : 'text-white bg-transparent focus:text-white hover:bg-slate-300'
                            } ${
                                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                            } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
                        }),
                    }}
                        value={2}>Following
                    </Tab>
                </TabsList>
                <TabPanel value={1} className='border'>
                    {followers?.length === 0 ? (
                        <p>No followers yet</p>
                    ) : (
                        <ul>
                            {followers && followers.map((follower, i) => {
                                if (follower.status === 'pending') {
                                    return (
                                        <li key={i} className='flex items-center gap-3 p-3 hover:bg-slate-50'>
                                            <div className='flex items-center gap-3'>
                                                <img className='w-16 rounded-full' src={follower.user?.profilePicture} />
                                                <p>{follower.user?.firstName} {follower.user?.lastName}</p>
                                            </div>
                                            <div className='flex justify-end gap-3'>
                                                <button onClick={(e) => respondToRequest(e, follower.user)} value='accepted' className='bg-odin-gold text-white p-1 rounded-xl w-20 '>Accept</button>
                                                <button onClick={(e) => respondToRequest(e, follower.user)} value='denied' className='bg-odin-gold text-white p-1 rounded-xl w-20 '>Deny</button>
                                            </div>
                                        </li>
                                    
                                    )
                                } else if (follower.status === 'accepted') {
                                    return (
                                        <li key={i} className='flex items-center gap-5 p-3 hover:bg-slate-50'> 
                                            <div className='flex items-center gap-3'>
                                                <img className='w-16 rounded-full' src={follower.user?.profilePicture} />
                                                <p>{follower.user?.firstName} {follower.user?.lastName}</p>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    )}
                </TabPanel>
                <TabPanel value={2} className='border'>
                    {following?.length === 0 ? (
                        <p>Not following anyone yet</p>
                    ) : (
                        <ul>
                            {following && following.map((follow, i) => {
                                return (
                                    <li key={i} className='flex items-center gap-5 p-3 hover:bg-slate-50'> 
                                        <img className='w-16 rounded-full' src={follow.user?.profilePicture} />
                                        <p>{follow.user?.firstName} {follow.user?.lastName}</p>
                                    </li>
                                )       
                            })}
                        </ul>
                    )}
                </TabPanel>
            </Tabs>

        </div>
    )
}

export default FollowList;