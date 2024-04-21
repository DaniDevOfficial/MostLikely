import { RouterProvider, createHashRouter } from "react-router-dom";

import { HomePage } from "./pages/Home";
import { DefaultLayout } from "./layouts/Default";
import { Lobby } from "./pages/Lobby";


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
        element: <Lobby />,
      }
    ],
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
