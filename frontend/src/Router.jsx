import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: '/signup',
            element: <Signup />,
        },
        {
            path: '/login',
            element: <Login />,
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Router;