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
        return await postService.createPost(postContent, token);
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

    }
})

export const {reset} = postSlice.actions;
export default postSlice.reducer;