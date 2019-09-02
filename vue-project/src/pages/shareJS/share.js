// function shareGetItem (key) {
//   return JSON.parse(localStorage.getItem(key))
// }
// function login () {
//   return shareGetItem('data')
// }
// login()
export default {
  login: function () {
    return JSON.parse(localStorage.getItem('data'))
  }
}
