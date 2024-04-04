import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getUsers = createAsyncThunk('user/getUsers', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; 
        return await userService.getUsers(token);
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const sendFollowRequest = createAsyncThunk('user/sendFollowRequest', async (requestUserID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; 
        return await userService.sendFollowRequest(token, requestUserID);
    } catch (error) {
        const message = error.response.data.error.message;
        console.log(message);
        return thunkAPI.rejectWithValue(message);
    }
});

export const respondToFollowRequest = createAsyncThunk('user/respondToFollowRequest', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; 
        return await userService.respondToFollowRequest(token, userData.userResponse, userData.followerID);
    } catch (error) {
        const message = error.response.data.error.message;
        console.log(message);
        return thunkAPI.rejectWithValue(message);
    }
});

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
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

export default userSlice.reducer;