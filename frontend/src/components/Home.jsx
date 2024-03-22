import CreatePost from './posts/CreatePost.jsx';
import Feed from './posts/Feed.jsx';
import DiscoverUsers from './user/DiscoverUsers.jsx';
import FollowList from './user/FollowList.jsx';

function Home() {
    return (
        <>
                    <FollowList />
            <CreatePost />
            <Feed />
            <DiscoverUsers />
        </>
    )
}

export default Home;