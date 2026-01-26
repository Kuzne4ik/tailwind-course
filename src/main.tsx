import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { AuthProvider } from './AuthProvider.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
