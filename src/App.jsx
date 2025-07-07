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
import Game5 from './pages/computer/game_page2/Game5'
import Game6 from './pages/computer/game_page2/Game6'
import Game7 from './pages/computer/game_page2/Game7'
import Game8 from './pages/computer/game_page2/Game8'
import InsideGame1 from './pages/game_page1/inside_game1/InsideGame1'
import InsideGame1_2 from './pages/game_page1/inside_game1/InsideGame1.2'
import InsideGame1_3 from './pages/game_page1/inside_game1/InsideGame1.3'
import InsideGame1_4 from './pages/game_page1/inside_game1/InsideGame1.4'

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
        <Route path="/game5" element={<Game5 />} />
        <Route path="/game6" element={<Game6 />} />
        <Route path="/game7" element={<Game7 />} />
        <Route path="/game8" element={<Game8 />} />
        <Route path="/inside-game1" element={<InsideGame1 />} />
        <Route path="/inside-game1-2" element={<InsideGame1_2 />} />
        <Route path="/inside-game1-3" element={<InsideGame1_3 />} />
        <Route path="/inside-game1-4" element={<InsideGame1_4 />} />
        <Route path="/" element={<HomePage3d />} />
      </Routes>
    </Router>
  )
}

export default App