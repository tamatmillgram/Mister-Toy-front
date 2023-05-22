
import { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import {  useNavigate, useParams  } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { removeToy, saveToy } from '../store/toy.action.js'

export function ToyEdit({ toy }) {
    const [toyToEdit, setToyToEdit] = useState({})
    const [toyEditInput, setToyEditInput] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        toyService.getById(params.toyId)
            .then((toy) => {
                setToyToEdit(toy)
            })
    }, [])

    function onEditToy() {
        toyToEdit.txt = toyEditInput
        saveToy(toyToEdit)
            .then((savedToy) => {
                showSuccessMsg(`Updated toy: ${savedToy.txt}`)
                navigate(`/toy`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
                navigate(`/toy`)
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function handleChange({ target }) {
        setToyEditInput(target.value)
    }

    return (
        <section className='toy-edit'>
            <h1>{toyToEdit.txt}</h1>
            <form onSubmit={onEditToy}>
                <input type="text" value={toyEditInput} onChange={handleChange} />
                <button>Save</button>
            </form>
            <button onClick={() => {
                onRemoveToy(toyToEdit._id)
            }}>x</button>
        </section>

    )
}

export default ToyEdit