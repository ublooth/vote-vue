import Vue from 'vue'
import Vuex from 'vuex'
import login from '../pages/shareJS/share' // 导入函数方法
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    login: {
      show: false, // 是否显示登录界面
      userInfo: false // 用户信息
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
      state.login.show = true // 显示登录界面
    },
    close (state) {
      state.login.show = false // 隐藏登录界面
    },
    judgeLogin (state) {
      let data = login.login() // 导入函数方法
      if (data) {
        state.login.userInfo = data
      } else {
        state.login.userInfo = false
      }
    }
  }
})
