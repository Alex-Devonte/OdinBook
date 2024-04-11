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
        <div className='bg-slate-200 md:mr-8'>
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
                            } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0`,
                        }),
                    }}
                        value={1}>Pending
                    </Tab>

                    <Tab slotProps={{
                        root: ({ selected, disabled }) => ({
                            className: `font-sans ${
                                selected
                                ? 'text-white bg-slate-500'
                                : 'text-white bg-transparent focus:text-white hover:bg-slate-300'
                            } ${
                                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                            } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0`,
                        }),
                    }}
                        value={2}>Followers
                    </Tab>

                    <Tab slotProps={{
                        root: ({ selected, disabled }) => ({
                            className: `font-sans ${
                                selected
                                ? 'text-white bg-slate-500'
                                : 'text-white bg-transparent focus:text-white hover:bg-slate-300'
                            } ${
                                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                            } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0`,
                        }),
                    }}
                        value={3}>Following
                    </Tab>
                </TabsList>

                {followers && followers.filter(follower => follower.status === 'pending').length === 0 && (
                    <TabPanel value={1}>
                        <p>No pending followers</p>
                    </TabPanel>
                )}

                {followers?.length === 0 ? (
                    <TabPanel value={2}>
                        <p>No followers</p>
                    </TabPanel>
                ) : (
                    <ul className='flex flex-row gap-10 justify-start items-stretch overflow-x-scroll text-center lg:flex-col lg:items-start lg:justify-between lg:overflow-x-auto lg:gap-2'>
                        {followers && followers.map((follower, i) => (
                            //Display appropriate panel based on follower status
                            <TabPanel key={i} value={follower.status === 'pending' ? 1 : 2} className='lg:w-full'>
                                <li key={i} className={`flex flex-col justify-between p-3 gap-5 h-full lg:flex-row lg:items-stretch lg:w-full hover:bg-slate-50 ${follower.status === 'pending' ? '' : ''}`}>
                                    <div className='flex flex-col items-center lg:flex-row lg:gap-5 lg:w-full'>
                                        <img className='w-16 rounded-full' src={follower.user?.profilePicture} />
                                        <p>{follower.user?.firstName} {follower.user?.lastName}</p>
                                    </div>
                                    {/* Display buttons for pending followers */}
                                    {follower.status === 'pending' && (
                                        <div className='flex flex-col items-center justify-end gap-5 mt-5 lg:flex-row lg:mt-0 lg:p-3 '>
                                            <button onClick={(e) => respondToRequest(e, follower.user)} value='accepted' className='bg-odin-gold text-white p-1 rounded-xl w-20 '>Accept</button>
                                            <button onClick={(e) => respondToRequest(e, follower.user)} value='denied' className='bg-odin-gold text-white p-1 rounded-xl w-20 '>Deny</button>
                                        </div>
                                    )}
                                </li>
                            </TabPanel>
                        ))}
                    </ul>
                )}

                <TabPanel value={3} className='border'>
                    {following?.length === 0 ? (
                        <p>Not following anyone yet</p>
                    ) : (
                        <ul className='flex flex-row gap-10 justify-start items-stretch overflow-x-scroll text-center lg:flex-col lg:items-start lg:justify-between lg:overflow-x-auto lg:gap-2'>
                            {following && following.map((follow, i) => {
                                return (
                                    <li key={i} className='flex flex-col justify-between p-3 gap-5 h-full lg:flex-row lg:items-stretch lg:w-full hover:bg-slate-50'> 
                                        <div className='flex flex-col items-center lg:flex-row lg:gap-5 lg:w-full'>
                                            <img className='w-16 rounded-full' src={follow.user?.profilePicture} />
                                            <p>{follow.user?.firstName} {follow.user?.lastName}</p>
                                        </div>
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