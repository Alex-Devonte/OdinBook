import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

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
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Router;