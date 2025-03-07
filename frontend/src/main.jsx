import { StrictMode, useEffect } from 'react'
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
import PageNotFound from './AdditionalNecessaryElements/PageNotFound.jsx'
import { useUserStore } from './store/useAuthStore.js'
import ProfilePage from './pages/ProfilePage.jsx'
import UserProfileDetails from './pages/UserProfileDetails.jsx'


const DefaulRun = () => {
  const { setUser } = useUserStore();
  useEffect(()=>{
    console.log("Default Run");
    setUser()
  }, [])
}

 
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
    path : '/profile',
    element : <ProfilePage />
  },
  {
    path : '*',
    element : <PageNotFound />
  },
  {
    path : '/profile/:username',
    element : <UserProfileDetails />
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
  <>
  <DefaulRun />
  <RouterProvider router={router} />
  </>
  //</StrictMode>
)

