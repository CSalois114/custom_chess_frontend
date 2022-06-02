import { Routes, Route, useNavigate } from "react-router-dom"
import Board from './Board'
import GameList from './GameList'
import CreateGame from "./CreateGame"
import Home from "./Home"

export default function App() {
  const navigate = useNavigate();
  return (
    <div id="appBody">
      <button id="homeButton" onClick={() => navigate(`/`)}> Home </button>
      <Routes>
        <Route path="/"               element={ <Home />       } />
        <Route path="/games"          element={ <GameList />   } />
        <Route path="/games/:game_id" element={ <Board />      } />
        <Route path="/games/new"      element={ <CreateGame /> } />
      </Routes>
    </div>
  )
}
