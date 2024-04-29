import { RouterProvider, createHashRouter, useParams } from "react-router-dom";

import { HomePage } from "./pages/Home";
import { DefaultLayout } from "./layouts/Default";
import { Game } from "./pages/Game";
import { useEffect } from "react";


const router = createHashRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true, // same path as parent: "/"
        element: <HomePage />,
      },
      {
        path: "lobby/:id",
        element: <Game />,
      }
    ],
  },

]);

export function Router() {
  const params = useParams();
  useEffect(() => {
    console.log(params)
  }, [params])
    
  return <RouterProvider router={router} />;
}
