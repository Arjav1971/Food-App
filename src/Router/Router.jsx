import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile"
import Orders from "../pages/dashboard/Orders"

import Cart from "../pages/menuPage/Cart";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";

import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment"


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
          path:"/menu",
          element:<Menu/>
        },
        {
          path:"cart-page",
          element:<PrivateRouter><Cart/></PrivateRouter>
        },
        {
          path:"/update-profile",
          element:<UpdateProfile/>
        },
        {
          path:"/orders",
          element:<Orders/>
        },
        {
          path:"/process-checkout",
          element:<Payment/>
        }
      ]
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    },

    // admin routes
    {
      path:"dashboard",
      element:<PrivateRouter><DashboardLayout/></PrivateRouter>,
      children:[
        {
          path:'',
          element:<Dashboard/>
        },
        {
          path:'users',
          element:<Users/>
        },
        {
          path:'add-menu',
          element:<AddMenu/>
        },
        {
          path:"manage-bookings",
          element:<ManageBookings/>
        },
        {
          path:'manage-items',
          element:<ManageItems/>
        },
        {
          path:"update-menu/:id",
          element:<UpdateMenu/>,
          loader:({params})=>fetch(`https://food-app-server-desi.onrender.com/menu/${params.id}`)

        }
    
      ]
    }
 
  ]);
  
 export default router