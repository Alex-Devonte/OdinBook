import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createPost = createAsyncThunk('posts/create', async (postContent, thunkAPI) => {
    try {
        //Get token from auth slice of redux store state
        const token = thunkAPI.getState().auth.user.token;
        return await postService.createPost(postContent, token);
    } catch (error) {
        
        //Send specific message if unauthorized
        if (error.response.data) {
            const message = error.response.data.error.message;
            console.log(error);
            return thunkAPI.rejectWithValue(message);
            //Otherwise send general error
        } else {
            const message = error.message;
            return thunkAPI.rejectWithValue(message);
        }
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
                state.message = action.payload;
            })

    }
})

export const {reset} = postSlice.actions;
export default postSlice.reducer;