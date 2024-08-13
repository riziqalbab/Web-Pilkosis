import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Auth/Login/Login.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'user',
        async lazy () {
          const LayoutApp = (await import('./Pages/User/MainUser.tsx')).default
          return {Component: LayoutApp}
        }
      },
      {
        path: "admin",
        async lazy () {
          const LayoutAdmin = (await import('./Pages/Admin/layoutAdmin.tsx')).default
          return {Component: LayoutAdmin}
        }
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
