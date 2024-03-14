import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    fieldErrors: [],
    message: ''
};

//Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) =>{
    try {
        return await authService.register(user);
    } catch(error) {
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

//Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) =>{
    try {
        return await authService.login(user);
    } catch(error) {
        console.log(error);
        //Send specific message if unauthorized
        if (error.response.status == 401) {
            const message = error.response.data;
            return thunkAPI.rejectWithValue(message);
            //Otherwise send general error
        } else {
            const message = error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

//Log user out
export const logout = createAsyncThunk('auth/logout', async() => {
   await authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.fieldErrors = [],
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.fieldErrors = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;