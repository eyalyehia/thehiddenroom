import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Model3D from './components/Model3D'
import Poster from './pages/poster/Poster'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/poster" element={<Poster />} />
        <Route path="/" element={<Model3D />} />
      </Routes>
    </Router>
  )
}

export default App