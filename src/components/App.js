import { Routes, Route } from "react-router-dom"
import Board from './Board'
import GameList from './GameList'

export default function App() {
  return (
    <div id="appBody">
      <Routes>
        <Route path="/games"          element={ <GameList />   } />
        <Route path="/games/:game_id" element={ <Board />      } />
        
      </Routes>
    </div>
  )
}
