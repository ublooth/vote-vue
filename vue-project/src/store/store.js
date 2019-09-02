import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    login: {
      show: false // 是否显示登录界面
    }
  },
  // mutations:改变数据方法的集合
  mutations: {
    increment: state => {
      state.count++
    },
    decrement: state => {
      state.count--
    },
    openPopup (state) {
      state.login.show = true
    },
    close (state) {
      state.login.show = false
    }
  }
})
