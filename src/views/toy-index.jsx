import {  useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'

import { useEffect,  } from 'react'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { ADD_TOY_TO_CART } from '../store/toy.reducer.js'
import { saveFilter } from '../store/filter.action.js'
import { Link, useNavigate } from 'react-router-dom'
import ToyFilter from '../cmps/toy-filter.jsx'
import ToyList from '../cmps/toy-list.jsx'

export default function ToyIndex() {

  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const navigate = useNavigate()


  useEffect(() => {
    loadToys(filterBy)
  }, [filterBy])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove toy')
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch(err => {
        showErrorMsg('Cannot add toy')
      })
  }

  function onEditToy(toy) {
    // const price = +prompt('New price?', toy.price)
    // if (!price || price === toy.price) return

    // const toyToSave = { ...toy, price }
    // saveToy(toyToSave)
    //     .then((savedToy) => {
    //         showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
    //     })
    //     .catch(err => {
    //         showErrorMsg('Cannot update toy')
    //     })
  }

  // function addToCart(toy) {
  //   showSuccessMsg('Added to Cart')
  //   dispatch({ type: ADD_TOY_TO_CART, toy })
  // }

  function onFilterChange(filter) {
    saveFilter({ ...filterBy, ...filter })
  }


  return (
    <section className='toy-index view'>
      <div>toy-index</div>
      <Link to={`/toy/edit`}>Add Toy</Link>
      <button onClick={onAddToy}>Add Toy</button>
      {isLoading && <div>Loading...</div>}
      <ToyFilter onFilterChange={onFilterChange} filterBy={filterBy} />
      <ToyList
        toys={toys}
        onRemoveToy={onRemoveToy}
        onEditToy={(toy) => navigate(`/toy/${toy._id}`)}
      // addToCart={addToCart}
      />
    </section>
  )
}
