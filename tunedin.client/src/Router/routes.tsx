import { Navigate } from "react-router-dom";
import Login from "../Components/Login/Login";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import GalleryComponent from "../Pages/Gallery/Gallery";
import Contact from "../Pages/Contact/Contact";
import Profile from "../Pages/Profile/Profile";
import Store from "../Pages/Store/Store";
import PlanDetails from "../Pages/PlanDetails/PlanDetails";

export const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/gallery',
        element: <GalleryComponent />,
    },
    {
        path: '/shop',
        element: <Store />, 
    },
    {
        path: '/shop/:plan_details',
        element: <PlanDetails />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/sign-in',
        element: <Login />,
        exact: true,
    },
    {
        path: '*',
        element: <Navigate to="/"/>,
    }
];