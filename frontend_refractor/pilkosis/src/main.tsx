import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/login/login.tsx'


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
        path: 'vote',
        async lazy () {
          const LayoutVote = (await import('./pages/vote/layout.tsx')).default
          return {Component: LayoutVote}
        },
        children: [
          {
            index: true,
            async lazy () {
              const IndexVote = (await import('./pages/vote/index.tsx')).default
              return {Component: IndexVote}
            }
          },
          {
            path: 'tentang',
            async lazy () {
              const AboutVote = (await import('./pages/vote/about.tsx')).default
              return {Component: AboutVote}
            }
          },
          {
            path: 'umpan-balik',
            async lazy () {
              const FeedbackVote = (await import('./pages/vote/feedback.tsx')).default
              return {Component: FeedbackVote}
            }
          }
        ]
      },
      {
        path: "admin",
        async lazy () {
          const LayoutAdmin = (await import('./pages/admin/layout.tsx')).default
          return {Component: LayoutAdmin}
        }
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
