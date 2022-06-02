export default function Tile({
  piece,
  coords,
  changeSelected,
  moveable,
  moveSelectedToCoords,
}) {
  let colorClass = "";
  piece && (colorClass = piece.home_team ? "user" : "enemy");
  moveable && (colorClass += " moveable");
  piece?.is_king && (colorClass += " king");

  return (
    <div
      className={`tile ${colorClass}`}
  
      style={{
        boxShadow: `${4 - coords.split(',')[0] / 1}px 4px 2px rgba(56, 52, 51, 0.71)`
      }}
      onClick={() => moveable && moveSelectedToCoords(coords)}
    >
      <div className="imgContainer" >
        {piece?.image ? <img src={piece.image} onClick={() => changeSelected(coords)} /> : null }
      </div>
    </div>
  );
}
