import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className='listHeader'>Poké Chess</h2>
      <ul id="homeList">
        <li onClick={() => navigate("/games")}>Saved Games List</li>
        <li>Create New Game</li>
      </ul>
    </div>
  )
}
