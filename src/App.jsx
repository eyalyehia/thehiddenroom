import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage3d from './pages/HomePage3d'
import Poster from './pages/poster/Poster'
import Poster2 from './pages/poster/Poster2'
import NootBookIcon from './pages/poster/NootBookIcon'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/poster" element={<Poster />} />
        <Route path="/poster2" element={<Poster2 />} />
        <Route path="/notebook" element={<NootBookIcon />} />
        <Route path="/" element={<HomePage3d />} />
      </Routes>
    </Router>
  )
}

export default App