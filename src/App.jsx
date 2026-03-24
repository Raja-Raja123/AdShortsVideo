import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Notification from './pages/Notification'
import ADs from './pages/ADs'
import Contact from './pages/Contact'
import UploadAd from './pages/uploadAd/UploadAd'
import { AuthContext } from './context/AuthContext'
import { Router } from './routing/Router'

 


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <RouterProvider router={Router} >
      <Layout/>
    </RouterProvider>
  )
}

export default App
