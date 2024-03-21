function Post(props) {
    const {post} = props;

    return (
        <div className='container'>
            <div className='border-2 border-b-black'>
                <p>Author: {post.author.firstName + ' ' + post.author.lastName}</p>
                <p>Content: {post.content}</p>
                <p>Comments: {post.comments.length}</p>
                <p>Likes: {post.likes.length}</p>
            </div>
        </div>
    );
}

export default Post;