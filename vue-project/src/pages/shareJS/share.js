function shareGetItem (key) {
  return JSON.parse(localStorage.getItem(key))
}
let login = shareGetItem('data')
export default {
  shareGetItem,
  login
}
