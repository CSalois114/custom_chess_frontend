export default function Tile({
  image,
  coords,
  changeSelected,
  moveable,
  moveSelected,
}) {
  return (
    <div
      className="tile"
      style={moveable ? { background: "green" } : null }
      onClick={() => moveSelected(coords)}
    >
      {/* <p>{coords}</p> */}
      <img src={image} onClick={() => changeSelected(coords)} />
    </div>
  );
}
