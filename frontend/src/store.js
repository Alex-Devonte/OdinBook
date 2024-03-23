import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import postsReducer from './features/posts/postSlice';
import userReducer from './features/user/userSlice';
import socialReducer from './features/social/socialSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        user: userReducer,
        social: socialReducer
    },
})