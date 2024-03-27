import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import TaskPage  from './Pages/TaskPage.jsx'
import RafflePage from './Pages/RafflePage.jsx'
import CreateRafflePage from './Pages/CreateRafflePage.jsx'
import CreateTaskPage from './Pages/CreateTaskPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/tasks",
    element: <TaskPage/>
  },
  {
    path: "/raffle",
    element: <RafflePage/>
  },
  {
    path: "/createtask",
    element: <CreateTaskPage/>
  },
  {
    path: "/createraffle",
    element: <CreateRafflePage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
