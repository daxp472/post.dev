import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import GenericCardComponent from './components/GenericCardComponent.jsx'
import LoginPage from './pages/LoginPage.jsx'
import UserRegisterationPage from './pages/UserRegisterationPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ExplorePage from './pages/ExplorePage.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'
import SettingComponents from './components/SettingComponent.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfileSectionComponent from './components/ProfileSectionComponent.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/explore',
    element: <ExplorePage />
  },
  {
    path : '/welcome',
    element : <LandingPage />
  },
  {
    path : '/create',
    element : <CreatePostPage />
  },
  {
    path : '/testing',
    element : <ProfileSectionComponent />
  },
  {
    path : '/more/settings',
    element : <SettingsPage />
  },
  {
    path: '/auth',
    children:[
      {
        path: '/auth/login',
        element: <LoginPage />
      },
      {
        path: '/auth/register',
        element: <UserRegisterationPage />
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router={router} />
  //</StrictMode>
)

