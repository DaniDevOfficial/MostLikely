import { RouterProvider, createHashRouter } from "react-router-dom";

import { HomePage } from "./pages/Home";
import { DefaultLayout } from "./layouts/Default";


const router = createHashRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true, // same path as parent: "/"
        element: <HomePage />,
      },
    ],
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
