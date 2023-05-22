import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
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

_createToys()

// function query(filterBy = {}) {
//     return httpService.get(BASE_URL, filterBy)
// }
// function getById(toyId) {
//     return httpService.get(BASE_URL + toyId)
// }
// function remove(toyId) {
//     // return Promise.reject('Not now!')
//     return httpService.delete(BASE_URL + toyId)
// }
// function save(toy) {
//     if (toy._id) {
//         return httpService.put(BASE_URL, toy)
//     } else {
//         // when switching to backend - remove the next line
//         return httpService.post(BASE_URL, toy)
//     }
// }

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY).then((toys) => {
        if (filterBy.name) {
            const regExp = new RegExp(filterBy.name, 'i')
            toys = toys.filter((toy) => regExp.test(toy.name))
        }
        if (filterBy.inStock && filterBy.inStock !== 'all') {
            toys = toys.filter((toy) => filterBy.inStock === toy.inStock)
        }
        if (filterBy.labels && filterBy.labels.length > 0) {
            toys = toys.filter((toy) => {
                return filterBy.labels.every((label) => toy.labels.includes(label))
            })
        }
        return toys
    })
}
function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

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

// TEST DATA

async function _createToys() {
    console.log('create db')
    const toys = await query()
    if (toys.length > 0) return
    await storageService.post(STORAGE_KEY, {
        name: 'Buzz Lightyear',
        price: 123,
        labels: ['Doll', 'Battery Powered'],
        createdAt: 1631031801011,
        inStock: 'true',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Talking Teddy Bear',
        price: 89,
        labels: ['Baby', 'Doll'],
        createdAt: 1631125645863,
        inStock: 'true',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Musical Train Set',
        price: 299,
        labels: ['On wheels', 'Battery Powered', 'Outdoor'],
        createdAt: 1631099274372,
        inStock: 'false',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Colorful Puzzle Blocks',
        price: 45,
        labels: ['Puzzle', 'Art'],
        createdAt: 1631107412719,
        inStock: 'true',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Giggling Giraffe',
        price: 64,
        labels: ['Baby', 'Outdoor'],
        createdAt: 1631122838598,
        inStock: 'true',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Magic Drawing Board',
        price: 149,
        labels: ['Art', 'Baby', 'Outdoor'],
        createdAt: 1631136809867,
        inStock: 'false',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'RC Race Car',
        price: 79,
        labels: ['On wheels', 'Battery Powered'],
        createdAt: 1631102115584,
        inStock: 'true',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Stacking Rings',
        price: 19,
        labels: ['Baby'],
        createdAt: 1631129276751,
        inStock: 'false',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Interactive Learning Tablet',
        price: 129,
        labels: ['Baby', 'Battery Powered', 'Puzzle'],
        createdAt: 1631115098246,
        inStock: 'true',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Wooden Building Blocks',
        price: 59,
        labels: ['Puzzle'],
        createdAt: 1631132139382,
        inStock: 'true',
    })
    await storageService.post(STORAGE_KEY, {
        name: 'Outdoor Sports Set',
        price: 199,
        labels: ['Outdoor'],
        createdAt: 1631096917645,
        inStock: 'false',
    })
}