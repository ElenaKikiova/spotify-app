
import './App.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import { AppContextProvider } from './context/context';
import TopSongs from './components/TopSongs';
import { routeGuard } from './spotify-auth/auth';

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;