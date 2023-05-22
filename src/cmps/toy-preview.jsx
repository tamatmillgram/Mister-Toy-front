

export default function ToyPreview({toy}) {
  return (
    <article className="toy-preview">
      <header>
        <h3>{toy.name}</h3>
        <p>Price: <span>${toy.price}</span></p>
        </header>
        <div className="labels">
          {toy.labels.map((label, idx)=>(
            <label key={idx}>{label}</label>
          ))}
        </div>
        <div className="in-stock">{toy.inStock? `in stock`: `not in stock`}</div>

        {/* <Link to={`/toy/${toy._id}`}>Details</Link> | 
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>  */}

    </article>
  )
}
