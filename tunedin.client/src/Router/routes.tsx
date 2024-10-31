import { Navigate } from "react-router-dom";
import Login from "../Components/LoginComponents/Login";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import GalleryComponent from "../Pages/Gallery/Gallery";
import Contact from "../Pages/Contact/Contact";
import Profile from "../Pages/Profile/Profile";
import Store from "../Pages/Store/Store";
import PlanDetails from "../Pages/PlanDetails/PlanDetails";
import ProfilesList from "../Components/ManageProfilesComponents/ProfilesList";
import Forms from "../Components/FormsComponents/Forms";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/gallery",
    element: <GalleryComponent />,
  },
  {
    path: "/services",
    element: <Store />,
  },
  {
    path: "/services/:plan_details",
    element: <PlanDetails />,
  },
  {
    path: "/forms",
    element: <Forms />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/sign-in",
    element: <Login />,
    exact: true,
  },
  {
    path: "/manage-profiles",
    element: <ProfilesList />,
    exact: true,
  },
  {
    path: "/manage-profiles/:profile_id",
    element: <Profile viewingAsAdmin />,
    exact: true,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
