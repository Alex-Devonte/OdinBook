import CreatePost from './posts/CreatePost.jsx';
import Feed from './posts/Feed.jsx';
import DiscoverUsers from './user/DiscoverUsers.jsx';

function Home() {
    return (
        <>
            <CreatePost />
            <Feed />
            <DiscoverUsers />
        </>
    )
}

export default Home;