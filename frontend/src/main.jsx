import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import GenericCardComponent from './components/GenericCardComponent.jsx'
import LoginPage from './pages/LoginPage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/explore',
    element: <GenericCardComponent />
  },
  {
    path: '/auth',
    children:[
      {
        path: '/auth/login',
        element: <LoginPage />
      },
      // {
      //   path: '/auth/register',
      //   element: <RegistrationPage />
      // }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

