<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="isRouterAlive"/>
    <signIn/> <!-- 登入组件 -->
  </div>
</template>

<script>
import signIn from './components/signIn.vue'
export default {
  name: 'App',
  components: {
    signIn
  },
  // 刷新页面
  // 父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  // 在 `methods` 对象中定义方法
  methods:{
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
