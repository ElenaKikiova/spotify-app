
import { Navigate, createBrowserRouter } from "react-router-dom";
import TopSongs from "../pages/TopSongs";
import { routeGuard } from "../spotify-auth/auth";
import Login from "../pages/Login";
import Page from "../ui/Page";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Page showMenu={false}><Login /></Page>
  },
  {
    path: '/top-songs',
    element: <Page><TopSongs /></Page>,
    loader: routeGuard
  }
]);

export default router;