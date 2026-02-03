import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { AuthProvider } from './AuthProvider.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Home.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404</div>

  },
  {
    path: "/aboutus",
    element: <div>About us</div>
  }
]);
const root = document.getElementById('root')

createRoot(root!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
