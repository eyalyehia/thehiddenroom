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
import Game1 from './pages/game_page1/Game1'
import Game2 from './pages/game_page1/Game2'
import Game3 from './pages/game_page1/Game3'
import Game4 from './pages/game_page1/Game4'

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
        <Route path="/game1" element={<Game1 />} />
        <Route path="/game2" element={<Game2 />} />
        <Route path="/game3" element={<Game3 />} />
        <Route path="/game4" element={<Game4 />} />
        <Route path="/" element={<HomePage3d />} />
      </Routes>
    </Router>
  )
}

export default App