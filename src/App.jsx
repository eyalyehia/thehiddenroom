import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage3d from './pages/HomePage3d'
import Poster from './pages/poster/Poster'
import Poster2 from './pages/poster/Poster2'
import NootBookIcon from './pages/poster/NootBookIcon'
import Tv from './pages/tv/Tv'
import Tv2 from './pages/tv/Tv2'
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
import InsideGame2 from './pages/game_page1/inside_game2/InsideGame2'
import InsideGame2_1 from './pages/game_page1/inside_game2/InsideGame2.1'
import InsideGame2_2 from './pages/game_page1/inside_game2/InsideGame2.2'
import InsideGame2_3 from './pages/game_page1/inside_game2/InsideGame2.3'
import InsideGame3 from './pages/game_page1/inside_game3/InsideGame3'
import InsideGame3_1 from './pages/game_page1/inside_game3/InsideGame3.1'
import InsideGame3_2 from './pages/game_page1/inside_game3/InsideGame3.2'
import InsideGame3_3 from './pages/game_page1/inside_game3/InsideGame3.3'
import InsideGame4 from './pages/game_page1/inside_game4/inside_game4'
import InsideGame4_1 from './pages/game_page1/inside_game4/inside_game4.1'
import InsideGame4_2 from './pages/game_page1/inside_game4/inside_game4.2'
import InsideGame4_3 from './pages/game_page1/inside_game4/inside_game4.3'
import InsideGame5 from './pages/computer/game_page2/inside_game5/InsideGame5'
import InsideGame5_1 from './pages/computer/game_page2/inside_game5/insideGame5.1'
import InsideGame5_2 from './pages/computer/game_page2/inside_game5/InsideGame5.2'
import InsideGame5_3 from './pages/computer/game_page2/inside_game5/InsideGame5.3'
import InsideGame6 from './pages/computer/game_page2/inside_game6/InsideGame6'
import InsideGame6_1 from './pages/computer/game_page2/inside_game6/InsideGame6.1'
import InsideGame6_2 from './pages/computer/game_page2/inside_game6/InsideGame6.2'
import InsideGame6_3 from './pages/computer/game_page2/inside_game6/InsideGame6.3'
import InsideGame7 from './pages/computer/game_page2/inside_game7/InsideGame7'
import InsideGame7_1 from './pages/computer/game_page2/inside_game7/InsideGame7.1'
import InsideGame7_2 from './pages/computer/game_page2/inside_game7/InsideGame7.2'
import InsideGame7_3 from './pages/computer/game_page2/inside_game7/InsideGame7.3'
import InsideGame8 from './pages/computer/game_page2/inside_game8/InsideGame8'
import InsideGame8_1 from './pages/computer/game_page2/inside_game8/InsideGame8.1'
import InsideGame8_2 from './pages/computer/game_page2/inside_game8/InsideGame8.2'
import InsideGame8_3 from './pages/computer/game_page2/inside_game8/InsideGame8.3'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/poster" element={<Poster />} />
        <Route path="/poster2" element={<Poster2 />} />
        <Route path="/notebook" element={<NootBookIcon />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv2" element={<Tv2 />} />
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
        <Route path="/inside-game2" element={<InsideGame2 />} />
        <Route path="/inside-game2-1" element={<InsideGame2_1 />} />
        <Route path="/inside-game2-2" element={<InsideGame2_2 />} />
        <Route path="/inside-game2-3" element={<InsideGame2_3 />} />
        <Route path="/inside-game3" element={<InsideGame3 />} />
        <Route path="/inside-game3-1" element={<InsideGame3_1 />} />
        <Route path="/inside-game3-2" element={<InsideGame3_2 />} />
        <Route path="/inside-game3-3" element={<InsideGame3_3 />} />
        <Route path="/inside-game4" element={<InsideGame4 />} />
        <Route path="/inside-game4-1" element={<InsideGame4_1 />} />
        <Route path="/inside-game4-2" element={<InsideGame4_2 />} />
        <Route path="/inside-game4-3" element={<InsideGame4_3 />} />
        <Route path="/inside-game5" element={<InsideGame5 />} />
        <Route path="/inside-game5-1" element={<InsideGame5_1 />} />
        <Route path="/inside-game5-2" element={<InsideGame5_2 />} />
        <Route path="/inside-game5-3" element={<InsideGame5_3 />} />
        <Route path="/inside-game6" element={<InsideGame6 />} />
        <Route path="/inside-game6-1" element={<InsideGame6_1 />} />
        <Route path="/inside-game6-2" element={<InsideGame6_2 />} />
        <Route path="/inside-game6-3" element={<InsideGame6_3 />} />
        <Route path="/inside-game7" element={<InsideGame7 />} />
        <Route path="/inside-game7-1" element={<InsideGame7_1 />} />
        <Route path="/inside-game7-2" element={<InsideGame7_2 />} />
        <Route path="/inside-game7-3" element={<InsideGame7_3 />} />
        <Route path="/inside-game8" element={<InsideGame8 />} />
        <Route path="/inside-game8-1" element={<InsideGame8_1 />} />
        <Route path="/inside-game8-2" element={<InsideGame8_2 />} />
        <Route path="/inside-game8-3" element={<InsideGame8_3 />} />
        <Route path="/" element={<HomePage3d />} />
      </Routes>
    </Router>
  )
}

export default App