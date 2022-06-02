import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function GameList() {
  const [allGames, setAllGames] = useState([])

  useEffect(() => {
    fetch(`http://localhost:9292/games`)
    .then(res => res.json())
    .then(setAllGames);
  },[])
  
  const navigate = useNavigate();
  return (
    <div>
      <ul id="gameList">
        {allGames.map(game => <li onClick={() => navigate(`/games/${game.id}`)}>{game.name}</li>)}
      </ul>
    </div>
  )
}
