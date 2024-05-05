import { RouterProvider, createHashRouter } from "react-router-dom";

import { HomePage } from "./pages/Home";
import { DefaultLayout } from "./layouts/Default";
import { Game } from "./pages/Game";


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

    
  return <RouterProvider router={router} />;
}
