import Vue from 'vue'
import Vuex from 'vuex'
import login from '../pages/shareJS/share' // 导入函数方法
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    headname: '我要报名',
    loginFormHide: true, // 登录表单显示
    userNameHide: false, // 用户名窗口隐藏
    username: '', // 用户名
    hrefs: '/register', // 头部按钮链接
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
      state.login.show = true // 显示登录界面
    },
    close (state) {
      state.login.show = false // 隐藏登录界面
    },
    // 登录成功
    loginSuccess (state) {
      let data = login.login() // 导入函数方法
      console.log('data', data)
      state.username = data.username
      state.loginFormHide = false
      state.userNameHide = true
      state.headname = '个人主页'
      state.hrefs = '/detail/' + data.id
    },
    // 退出登录
    signOut (state) {
      state.hrefs = '/register'
      state.headname = '我要报名'
      state.loginFormHide = true
      state.userNameHide = false
      window.localStorage.clear()
    }
  }
})
