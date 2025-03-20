import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GenericCardComponent from './components/GenericCardComponent.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserRegisterationPage from './pages/UserRegisterationPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import SettingComponents from './components/SettingComponent.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfileSectionComponent from './components/ProfileSectionComponent.jsx';
import PageNotFound from './AdditionalNecessaryElements/PageNotFound.jsx';
import { useUserStore } from './store/useAuthStore.js';
import ProfilePage from './pages/ProfilePage.jsx';
import UserProfileDetails from './pages/UserProfileDetails.jsx';
import ChatsPage from './pages/ChatsPage.jsx'; // New Chat page
import { io } from 'socket.io-client'; // Socket.io client

// Socket.io connection setup
const socket = io(import.meta.env.VITE_API_BASE_URL, {
    auth: { token: localStorage.getItem('token') }, // Token from localStorage (adjust as per your auth)
    autoConnect: false, // Manual connect karenge jab user login ho
});

// Default run component for user state and socket connection
const DefaulRun = () => {
    const { setUser, user } = useUserStore();

    useEffect(() => {
        console.log("Default Run");
        setUser(); // Set user from store

        // Socket connect if user is logged in
        if (user) {
            socket.connect();
            console.log("Socket connected");
        }

        // Cleanup on unmount
        return () => {
            socket.disconnect();
            console.log("Socket disconnected");
        };
    }, [user]);

    return null; // Component kuch render nahi karta
};

// Router setup
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/explore',
        element: <ExplorePage />,
    },
    {
        path: '/welcome',
        element: <LandingPage />,
    },
    {
        path: '/create',
        element: <CreatePostPage />,
    },
    {
        path: '/testing',
        element: <ProfileSectionComponent />,
    },
    {
        path: '/more/settings',
        element: <SettingsPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
    },
    {
        path: '/chats', // Chat page route
        element: <ChatsPage socket={socket} />, // Socket pass kiya as prop
    },
    {
        path: '/profile/:username',
        element: <UserProfileDetails />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
    {
        path: '/auth',
        children: [
            {
                path: '/auth/login',
                element: <LoginPage />,
            },
            {
                path: '/auth/register',
                element: <UserRegisterationPage />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <>
        <DefaulRun />
        <RouterProvider router={router} />
    </>
    // </StrictMode>
);