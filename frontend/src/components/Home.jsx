import CreatePost from './posts/CreatePost.jsx';
import Feed from './posts/Feed.jsx';
import DiscoverUsers from './user/DiscoverUsers.jsx';
import FollowList from './user/FollowList.jsx';

function Home() {
    return (
        <>
         <div className="col-span-full m-4 order-3 md:order-none md:col-span-1 md:m-0">
                <DiscoverUsers />
            </div>
            <div className="col-span-full m-4 order-2  md:order-none md:col-span-1 md:m-0">
                <CreatePost  />
                <Feed />
            </div>
            <div className="col-span-full m-4 order-1 md:order-none md:col-span-1 md:m-0">
                <FollowList />
            </div>
        </>
    )
}

export default Home;