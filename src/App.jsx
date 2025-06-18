import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage3d from './pages/HomePage3d'
import Poster from './pages/poster/Poster'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/poster" element={<Poster />} />
        <Route path="/" element={<HomePage3d />} />
      </Routes>
    </Router>
  )
}

export default App