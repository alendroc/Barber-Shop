import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar/sidebar'
import Inicio from './pages/inicio'
import Navbar from './components/navbar/navbar'
function App() {
  const [count, setCount] = useState(0)
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 830)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className='divicionPantalla'>
          {isMobile ? <Navbar /> : <Sidebar />}
        <div className='mainContent'>
            <Routes>
            <Route path='/' element={<Inicio />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
