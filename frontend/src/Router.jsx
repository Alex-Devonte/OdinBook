import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path:'/profile',
            element: <Profile />,
        },
        { 
            path: 'profile/edit', 
            element: <EditProfile /> 
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Router;