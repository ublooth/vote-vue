import Vue from 'vue'
import Vuex from 'vuex'

import utils from './utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    login: {
      show: false,    // 是否显示弹窗
      userInfo: false  // 用户信息
    }
  },
  mutations: {
  	increment: (state, p ) => {
      state.count++
      console.log('p', p)
    },
    decrement: state => state.count--,
    open(state) {
      state.login.show = true
    },
    close(state) {
      state.login.show = false
    },
    judgeLogin(state) {
      let data = utils.getStorage('data')
      if (data) {
        state.login.userInfo = data
      } else {
        state.login.userInfo = false
      }
    }
  },
  actions: {

  }
})
