import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

export default function Editor({
  gameObj,
  changeTypeSelected,
  typeSelected,
  toggleDeleteMode,
  isDeleteMode,
  toggleEditingMode
}) {
  const [name, setName] = useState(gameObj.name);
  const navigate = useNavigate();

  const updateName = (e) => {
    setName(e.target.value);
  };

  return (
    <div id="editor">
      <form>
        <input onChange={updateName} value={name} />
      </form>
      <button 
        id="deletePokeButton" 
        className={"editButton " + (isDeleteMode ? "active" : null )}
        onClick={toggleDeleteMode}
      >
        Delete Pieces
      </button>
      <button 
        id="newPokeButton" 
        className="editButton"
        onClick={() => navigate(`/games/${gameObj.id}/piece_types`)}
      >
        New PokéMon
      </button>
      <button 
        id="saveButton" 
        className="editButton"
        onClick={() => toggleEditingMode()}
      >
        Save Setup
      </button>
      <div>
        <div id="rosterGrid">
          {gameObj.piece_types.map((piece) => {
            return (
              <img
                key={piece.id}
                className={
                  (typeSelected === piece ? "typeSelected" : null) + " poke"
                }
                src={piece.front_img}
                onClick={() => changeTypeSelected(piece)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
