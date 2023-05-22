import {  store } from './store.js'
import { SET_FILTER } from './toy.reducer.js'


export function saveFilter(filterBy) {
  return store.dispatch({ type: SET_FILTER, filterBy })
}