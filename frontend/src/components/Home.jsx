import CreatePost from './posts/CreatePost.jsx';
import Feed from './posts/Feed.jsx';
import DiscoverUsers from './user/DiscoverUsers.jsx';
import FollowList from './user/FollowList.jsx';

function Home() {
    return (
        <>
         <div className="col-span-1">
                <DiscoverUsers />
            </div>
            <div className="col-span-1">
                <CreatePost  />
                <Feed />
            </div>
            <div className="col-span-1">
                <FollowList />
            </div>
        </>
    )
}

export default Home;