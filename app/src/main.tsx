
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Employee from './pages/Employee'
import Office from './pages/Office'
import Manager from './pages/Manager'
import Admin from './pages/Admin'

const router = createBrowserRouter(
  [
    { path: '/', element: <App /> },
    { path: '/employee', element: <Employee /> },
    { path: '/office', element: <Office /> },
    { path: '/manager', element: <Manager /> },
    { path: '/admin', element: <Admin /> },
  ],
  { basename: '/demo' }
)

function Root() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/demo/sw.js')
    }
  }, [])
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
