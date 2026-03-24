import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Notification from "../pages/Notification";
import ADs from "../pages/ADs";
import Contact from "../pages/Contact";
import UploadAd from "../pages/uploadAd/UploadAd";
import Layout from "@/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "@/pages/Profile";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/contact",
        element: (
          <ProtectedRoute>
            {" "}
            <Contact />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "/ads", element: <ADs /> },
      {
        path: "/notifications",
        element: (
          <ProtectedRoute>
            {" "}
            <Notification />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "/search", element: <Search /> },
      {
        path: "/upload_ads",
        element: (
          <ProtectedRoute>
            <UploadAd />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
           <ProtectedRoute>
            <Profile />
            </ProtectedRoute>
        ),
      },
    ],
  },
]);
