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
import Menu from "../pages/home/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/home/dashboard/UpdateProfile";


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
          element:<PrivateRouter><Menu/></PrivateRouter>
        },
        {
          path:"/update-profile",
          element:<UpdateProfile/>
        }
      ]
    },
    {
      path:"/signup",
      element:<Signup/>
    }
 
  ]);
  
 export default router