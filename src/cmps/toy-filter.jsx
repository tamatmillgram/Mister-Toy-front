import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import LabelSelect from './label-select'
import { setFilter } from '../store/toy.action'

export default function ToyFilter({ onFilterChange, filterBy }) {
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

    function onNameChange({target}) {
        setIsWriting(true)
        setName(target.value)
    }

    function onStockChange({ target }) {
        setInStock(target.value)
        onFilterChange({ inStock: target.value })
    }

    function onSelectChange({ target }) {
        const val = target.value
        onFilterChange({ labels: val })

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
        <section>
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
                    <LabelSelect labels={filterBy.labels} onSelectChange={onSelectChange} />
                </div>
                <div className="filter-container"></div>
            </form>
        </section>
    )
}