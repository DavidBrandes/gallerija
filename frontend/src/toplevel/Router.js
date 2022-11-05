import MainPage from "../pages/MainPage";
import DetailPage from "../pages/DetailPage";
import Test from "../test/Test";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/detail/:id",
    element: <DetailPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

function Router() {
  console.log("router render");
  return <RouterProvider router={router} />;
}

export default Router;
