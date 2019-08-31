let loginData = null


function getStorage (key) {
    return localStorage.getItem(key)
}

loginData = getStorage('data')

export default {
    getStorage,
    loginData
}