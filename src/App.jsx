import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage3d from './pages/HomePage3d'
import Poster from './pages/poster/Poster'
import Poster2 from './pages/poster/Poster2'
import NootBookIcon from './pages/poster/NootBookIcon'
import Logo from './pages/logo/Logo'
import Logo2 from './pages/logo/Logo2'
import Computer from './pages/computer/Computer'
import Computer2 from './pages/computer/Computer2'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/poster" element={<Poster />} />
        <Route path="/poster2" element={<Poster2 />} />
        <Route path="/notebook" element={<NootBookIcon />} />
        <Route path="/logo" element={<Logo />} />
        <Route path="/logo2" element={<Logo2 />} />
        <Route path="/computer" element={<Computer />} />
        <Route path="/computer2" element={<Computer2 />} />
        <Route path="/" element={<HomePage3d />} />
      </Routes>
    </Router>
  )
}

export default App