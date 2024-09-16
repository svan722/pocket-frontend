import App from './pages/App';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Earn from './pages/Earn';
import Friends from './pages/Friends';
import Leaderboard from './pages/Leaderboard';
import Chat from './pages/Chat';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "signup",
        element: <Signup />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "earn",
                element: <Earn />
            },
            {
                path: "friends",
                element: <Friends />
            },
            {
                path: "leaderboard",
                element: <Leaderboard />
            },
            {
                path: "chat",
                element: <Chat />
            }
        ]
    },
    {
        path: '*',
        element: <p>404 Error - Nothing here...</p>
    }
]);

export default router;