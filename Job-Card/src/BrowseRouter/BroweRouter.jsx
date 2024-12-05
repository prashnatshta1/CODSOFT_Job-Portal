import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import PrivateRoute from "./PrivateRoute";

const BrowseRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> }, // Public route
      {
        path: "/post-job",
        element: (
          <PrivateRoute>
            <PostJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-job",
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/salary",
        element: (
          <PrivateRoute>
            <SalaryPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default BrowseRouter;
