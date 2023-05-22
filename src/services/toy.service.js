// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
}



function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}
function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        // when switching to backend - remove the next line
        return httpService.post(BASE_URL, toy)
    }
}

// function query(filterBy = {}) {
//     return storageService.query(STORAGE_KEY).then((toys) => {
//         if (filterBy.name) {
//             const regExp = new RegExp(filterBy.name, 'i')
//             toys = toys.filter((toy) => regExp.test(toy.name))
//         }
//         if (filterBy.inStock && filterBy.inStock !== 'all') {
//             toys = toys.filter((toy) => filterBy.inStock === toy.inStock)
//         }
//         if (filterBy.labels && filterBy.labels.length > 0) {
//             toys = toys.filter((toy) => {
//                 return filterBy.labels.every((label) => toy.labels.includes(label))
//             })
//         }
//         return toys
//     })
// }

// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId)
// }
// function remove(toyId) {
//     // return Promise.reject('Not now!')
//     return storageService.remove(STORAGE_KEY, toyId)
// }
// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         // when switching to backend - remove the next line
//         // toy.owner = userService.getLoggedinUser()
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }

function getEmptyToy() {
    return {
        name: 'Buzz Lightyear',
        price: 123,
        labels: ['Doll', 'Battery Powered'],
        createdAt: 1631031801011,
        inStock: true,
    }
}

function getDefaultFilter() {
    return { name: '', inStock: 'all', labels: [], pageIdx: 0 }
}

function getLabels() {
    return labels
}

