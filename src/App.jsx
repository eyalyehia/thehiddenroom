import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage3d from './pages/HomePage3d'
import Poster from './pages/poster/Poster'
import Poster2 from './pages/poster/Poster2'
import NootBookIcon from './pages/poster/NootBookIcon'
import Tv from './pages/tv/Tv'
import Tv2 from './pages/tv/Tv2'
import Move1 from './pages/tv/move_1/main/Move1'
import InMove1 from './pages/tv/move_1/sections/InMove1'
import InMove2 from './pages/tv/move_1/sections/InMove2'
import InMove3 from './pages/tv/move_1/sections/InMove3'
import InMove4 from './pages/tv/move_1/sections/InMove4'
import Move2 from './pages/tv/move_2/main/Move2'
import InMove2_1 from './pages/tv/move_2/sections/InMove2_1'
import InMove2_2 from './pages/tv/move_2/sections/InMove2_2'
import InMove2_3 from './pages/tv/move_2/sections/InMove2_3'
import InMove2_4 from './pages/tv/move_2/sections/InMove2_4'
import Move3 from './pages/tv/move_3/main/Move3'
import Move4 from './pages/tv/move_4/main/Move4'
import Move5 from './pages/tv/move_5/main/Move5'
import Move6 from './pages/tv/move_6/main/Move6'
import Move7 from './pages/tv/move_7/main/Move7'
import Move8 from './pages/tv/move_8/main/Move8'
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
import InMove3_1 from './pages/tv/move_3/sections/InMove3_1'
import InMove3_2 from './pages/tv/move_3/sections/InMove3_2'
import InMove3_3 from './pages/tv/move_3/sections/InMove3_3'
import InMove3_4 from './pages/tv/move_3/sections/InMove3_4'
import InMove4_1 from './pages/tv/move_4/sections/InMove4_1'
import InMove4_2 from './pages/tv/move_4/sections/InMove4_2'
import InMove4_3 from './pages/tv/move_4/sections/InMove4_3'
import InMove4_4 from './pages/tv/move_4/sections/InMove4_4'
import InMove5_1 from './pages/tv/move_5/sections/InMove5_1'
import InMove5_2 from './pages/tv/move_5/sections/InMove5_2'
import InMove5_3 from './pages/tv/move_5/sections/InMove5_3'
import InMove5_4 from './pages/tv/move_5/sections/InMove5_4'
import InMove6_1 from './pages/tv/move_6/sections/InMove6_1'
import InMove6_2 from './pages/tv/move_6/sections/InMove6_2'
import InMove6_3 from './pages/tv/move_6/sections/InMove6_3'
import InMove6_4 from './pages/tv/move_6/sections/InMove6_4'
import InMove7_1 from './pages/tv/move_7/sections/InMove7_1'
import InMove7_2 from './pages/tv/move_7/sections/InMove7_2'
import InMove7_3 from './pages/tv/move_7/sections/InMove7_3'
import InMove7_4 from './pages/tv/move_7/sections/InMove7_4'
import InMove8_1 from './pages/tv/move_8/sections/InMove8_1'
import InMove8_2 from './pages/tv/move_8/sections/InMove8_2'
import InMove8_3 from './pages/tv/move_8/sections/InMove8_3'
import InMove8_4 from './pages/tv/move_8/sections/InMove8_4'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/poster" element={<Poster />} />
        <Route path="/poster2" element={<Poster2 />} />
        <Route path="/notebook" element={<NootBookIcon />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv2" element={<Tv2 />} />
        <Route path="/tv/move_1/main/Move1" element={<Move1 />} />
        <Route path="/tv/move_1/sections/inMove1" element={<InMove1 />} />
        <Route path="/tv/move_1/sections/inMove2" element={<InMove2 />} />
        <Route path="/tv/move_1/sections/inMove3" element={<InMove3 />} />
        <Route path="/tv/move_1/sections/inMove4" element={<InMove4 />} />
        <Route path="/tv/move_2/main/Move2" element={<Move2 />} />
        <Route path="/tv/move_2/sections/InMove2.1" element={<InMove2_1 />} />
        <Route path="/tv/move_2/sections/InMove2.2" element={<InMove2_2 />} />
        <Route path="/tv/move_2/sections/InMove2.3" element={<InMove2_3 />} />
        <Route path="/tv/move_2/sections/InMove2.4" element={<InMove2_4 />} />
        <Route path="/tv/move_3/main/Move3" element={<Move3 />} />
        <Route path="/tv/move_3/sections/InMove3_1" element={<InMove3_1 />} />
        <Route path="/tv/move_3/sections/InMove3_2" element={<InMove3_2 />} />
        <Route path="/tv/move_3/sections/InMove3_3" element={<InMove3_3 />} />
        <Route path="/tv/move_3/sections/InMove3_4" element={<InMove3_4 />} />
        <Route path="/tv/move_4/main/move4" element={<Move4 />} />
        <Route path="/tv/move_4/sections/InMove4_1" element={<InMove4_1 />} />
        <Route path="/tv/move_4/sections/InMove4_2" element={<InMove4_2 />} />
        <Route path="/tv/move_4/sections/InMove4_3" element={<InMove4_3 />} />
        <Route path="/tv/move_4/sections/InMove4_4" element={<InMove4_4 />} />
        <Route path="/tv/move_5/main/move5" element={<Move5 />} />
        <Route path="/tv/move_5/sections/InMove5_1" element={<InMove5_1 />} />
        <Route path="/tv/move_5/sections/InMove5_2" element={<InMove5_2 />} />
        <Route path="/tv/move_5/sections/InMove5_3" element={<InMove5_3 />} />
        <Route path="/tv/move_5/sections/InMove5_4" element={<InMove5_4 />} />
        <Route path="/tv/move_6/main/move6" element={<Move6 />} />
        <Route path="/tv/move_6/sections/InMove6_1" element={<InMove6_1 />} />
        <Route path="/tv/move_6/sections/InMove6_2" element={<InMove6_2 />} />
        <Route path="/tv/move_6/sections/InMove6_3" element={<InMove6_3 />} />
        <Route path="/tv/move_6/sections/InMove6_4" element={<InMove6_4 />} />
        <Route path="/tv/move_7/main/move7" element={<Move7 />} />
        <Route path="/tv/move_7/sections/InMove7_1" element={<InMove7_1 />} />
        <Route path="/tv/move_7/sections/InMove7_2" element={<InMove7_2 />} />
        <Route path="/tv/move_7/sections/InMove7_3" element={<InMove7_3 />} />
        <Route path="/tv/move_7/sections/InMove7_4" element={<InMove7_4 />} />
        <Route path="/tv/move_8/main/move8" element={<Move8 />} />
        <Route path="/tv/move_8/sections/InMove8_1" element={<InMove8_1 />} />
        <Route path="/tv/move_8/sections/InMove8_2" element={<InMove8_2 />} />
        <Route path="/tv/move_8/sections/InMove8_3" element={<InMove8_3 />} />
        <Route path="/tv/move_8/sections/InMove8_4" element={<InMove8_4 />} />
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