import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'

function ToyFilter({ onFilterChange, filterBy }) {
  // console.log('filterBy', filterBy)
  filterBy = filterBy ? filterBy : toyService.getDefaultFilter()
  const [name, setName] = useState(filterBy.name)
  const [inStock, setInStock] = useState(filterBy.inStock)
  const [labels, setLabels] = useState(filterBy.labels)
  const [isWriting, setIsWriting] = useState(false)

  useEffect(() => {
    setName(filterBy.name)
    setInStock(filterBy.inStock)
    setLabels(filterBy.labels)
  }, [filterBy])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isWriting) {
        setIsWriting(false)
        onFilterChange({ name })
      }
    }, 400)
    return () => {
      clearTimeout(debounce)
    }
  }, [isWriting])

  function onNameChange(e) {
    setIsWriting(true)
    setName(e.target.value)
  }

  function onStockChange(e) {
    setInStock(e.target.value)
    onFilterChange({ inStock: e.target.value })
  }

  function onSelectChange(e) {
    const val = e.target.value
    const valIdx = labels.indexOf(val)
    if (valIdx === -1) {
      setLabels((prev) => [...prev, val])
      onFilterChange({ labels: [...labels, val] })
    }
  }

  function onRemoveLabel(e, val) {
    e.preventDefault()
    const newLabels = [...labels]
    const removeLabelIdx = newLabels.indexOf(val)
    newLabels.splice(removeLabelIdx, 1)
    setLabels(newLabels)
    onFilterChange({ labels: newLabels })
  }

  return (
    <form>
      <div className="filter-container">
        <label htmlFor="name">Name</label>
        <input value={name} onChange={onNameChange} type="text" name="name" placeholder="Search..."></input>
      </div>
      <div className="filter-container">
        <label htmlFor="in-stock-all">All</label>
        <input onChange={onStockChange} id="in-stock-all" type="radio" name="in-stock" value="all" checked={inStock === 'all'}></input>
        <label htmlFor="in-stock-stock">Only in stock</label>
        <input onChange={onStockChange} id="in-stock-stock" type="radio" name="in-stock" value="true" checked={inStock === 'true'}></input>
        <label htmlFor="in-stock-out">Only out of stock</label>
        <input onChange={onStockChange} id="in-stock-out" type="radio" name="in-stock" value="false" checked={inStock === 'false'}></input>
      </div>
      <div className="filter-container">
        <ul>
          {labels.map((label) => (
            <li key={label}>
              {label} <button onClick={(e) => onRemoveLabel(e, label)}>x</button>
            </li>
          ))}
        </ul>
        <select onChange={onSelectChange}>
          {toyService.getLabels().map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-container"></div>
    </form>
  )
}

export default ToyFilter