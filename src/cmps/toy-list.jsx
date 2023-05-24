import ToyPreview from "./toy-preview"

export default function ToyList({ toys, onRemoveToy, onEditToy }) {


  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li key={toy._id}>
          <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
          <div className="btns-list">toy
            <button className="btn" onClick={() => { onEditToy(toy) }} title="Edit">
              Edit
            </button>
            <button className="btn" onClick={() => { onRemoveToy(toy._id) }} title="Delete">Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
