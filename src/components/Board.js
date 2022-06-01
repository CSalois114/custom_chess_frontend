import { useState, useEffect } from 'react'
import Tile from './Tile'

export default function Board() {
  const [gameObj, setGameObj] = useState("");
  const [selected, setSelected] = useState(null);

  const pieceAtCoords = coords => {
    return gameObj.deployments.find(dep => dep.coords === coords)
  }

  const changeSelected = (coords) => {
    if(selected && selected.coords === coords) {
      setSelected(null)
    } else {
      setSelected(pieceAtCoords(coords))
    }
  }

  const moveSelected = coords => {
    if(selected && getPossibleMoves(selected).includes(coords)) {
      selected.coords = coords;
      setGameObj({...gameObj});
    }
  }

  const getCoordsFromOffset = (startCoords, offset) => {
    const splitCoords = startCoords.split(',').map(n => parseInt(n, 10))
    const splitOffset = offset.split(',').map(n => parseInt(n, 10))
    return [splitCoords[0] + splitOffset[0], splitCoords[1] + splitOffset[1]].join()
  }

  const isDependencyClear = (piece, move) => {
    if (move.dependent_on) {
      const dependencyCoords = getCoordsFromOffset(piece.coords, move.dependent_on)
      if (pieceAtCoords(dependencyCoords)) {
        return false;
      }
      const dependentMove = piece.moves.find(newMove => newMove.offset === move.dependent_on)
      return isDependencyClear(piece, dependentMove)
    }
    return true
  }

  const getPossibleMoves = (piece) => {
    return piece && piece.moves.map(move => {
      const coords = getCoordsFromOffset(piece.coords, move.offset)
      const isDiffTeam = pieceAtCoords(coords)?.home_team !== piece.home_team
      const isDependenciesClear = (isDependencyClear(piece, move));
      
      // console.log("move offset", move.offset, "diffTeam", isDiffTeam, "clear", isDependenciesClear)
      return isDiffTeam && isDependenciesClear ? coords : null;
    });
  }
  
  useEffect(() => {
    fetch(`http://localhost:9292/games/13`)
    .then(res => res.json())
    .then(setGameObj);
  },[])
  
  const possibleMoves = getPossibleMoves(selected)
  const boardSize = 7;

  return (
    <div id="board" >
      <div id="grid">
        {[...Array(boardSize ** 2).keys()].map(i => {
          const coords = `${i % boardSize + 1},${7 - Math.floor(i / boardSize)}`;
          const moveable = possibleMoves?.includes(coords)
          const image = gameObj.deployments?.find(dep => dep.coords === coords)?.image
          return (
            <Tile 
              key={coords} 
              image={image} 
              coords={coords} 
              moveable={moveable}
              changeSelected={changeSelected}
              moveSelected={moveSelected}
            />
          )
        })}
      </div>
    </div>
  );
}
