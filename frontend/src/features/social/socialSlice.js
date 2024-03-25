import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import socialService from './socialService';

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
export const sendFollowRequest = createAsyncThunk('social/sendFollowRequest', async (requestUserID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; 
        return await socialService.sendFollowRequest(token, requestUserID);
    } catch (error) {
        const message = error.response.data.error.message;
        console.log(message);
        return thunkAPI.rejectWithValue(message);
    }
});

export const respondToFollowRequest = createAsyncThunk('social/respondToFollowRequest', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; 
        return await socialService.respondToFollowRequest(token, userData.userResponse, userData.followerID);
    } catch (error) {
        const message = error.response.data.error.message;
        console.log(message);
        return thunkAPI.rejectWithValue(message);
    }
});

export const socialSlice = createSlice({
    name: 'social',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendFollowRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendFollowRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(sendFollowRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(respondToFollowRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(respondToFollowRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(respondToFollowRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export default socialSlice.reducer;