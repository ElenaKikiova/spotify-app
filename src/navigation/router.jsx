
import { Navigate, createBrowserRouter } from "react-router-dom";
import TopSongs from "../pages/TopSongs";
import { routeGuard } from "../spotify-auth/auth";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/top-songs',
    element: <TopSongs />,
    loader: routeGuard
  }
]);

export default router;