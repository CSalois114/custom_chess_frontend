import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleNewGameClick = e => {
    e.target.innerText = "...LOADING";
    fetch(`http://localhost:9292/games/new`)
    .then(res => res.json())
    .then(newGame => {
      navigate(`/games/${newGame.id}`)
    });
    
    // navigate("/games/new")
  }

  return (
    <div>
      <h2 className='listHeader'>Poké Chess</h2>
      <ul id="homeList">
        <li onClick={() => navigate("/games")}>Select Game</li>
        <li onClick={handleNewGameClick}>Create New Game</li>
      </ul>
    </div>
  )
}
