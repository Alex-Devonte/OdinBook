import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    fieldErrors: [],
    message: ''
}

export const createPost = createAsyncThunk('posts/create', async (postContent, thunkAPI) => {
    try {
        //Get token from auth slice of redux store state
        const token = thunkAPI.getState().auth.user.token;
        const newPost =  await postService.createPost(postContent, token);
        
        //After successful post creation, fetch post again for latest data
        thunkAPI.dispatch(getPosts());
        
        return newPost;
    } catch (error) {
        if (error.response.data) {
            const errors = error.response.data.errors;
            
            //Create new array with field name and error message
            let fieldErrors = [];
            errors.forEach(element => {
                fieldErrors[element.path] = element.msg;
            });

            return thunkAPI.rejectWithValue(fieldErrors);
        } else {
            const message = error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getPosts = createAsyncThunk('posts/getPosts', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.getPosts(token);
    } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.deletePost(token, postID);
    } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const likePost = createAsyncThunk('posts/likePost', async (postID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.likePost(token, postID);
    } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const createComment = createAsyncThunk('posts/createComment', async (commentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const {postID, commentText} = commentData;
        return await postService.createComment(token, postID, commentText);
    } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteComment = createAsyncThunk('posts/deleteComment', async (commentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const {postID, commentID} = commentData;
        return await postService.deleteComment(token, postID, commentID);
    } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.fieldErrors = action.payload;
                state.message = action.payload;
            })
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(likePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                //Find index of post
                const postIndex = state.posts.findIndex(post => post._id === action.payload._id);

                //Update the post with the updated post data so the like count will update
                if (postIndex !== -1) {
                    state.posts[postIndex] = action.payload;
                }       
            })
            .addCase(likePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                //Find index of post
                const postIndex = state.posts.findIndex(post => post._id === action.payload._id);

                //Update the post.comment array with the updated post data so the comment count will update
                if (postIndex !== -1) {
                    state.posts[postIndex].comments = action.payload.comments;
                }       
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                
                //Find index of post
                const postIndex = state.posts.findIndex(post => post._id === action.payload._id);

                //Update the post.comment array with the updated post data
                if (postIndex !== -1) {
                    state.posts[postIndex].comments = action.payload.comments;
                }       
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = postSlice.actions;
export default postSlice.reducer;