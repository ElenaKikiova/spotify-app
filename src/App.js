
import './App.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import { AppContextProvider } from './context/context';
import TopSongs from './pages/TopSongs';
import { routeGuard } from './spotify-auth/auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;