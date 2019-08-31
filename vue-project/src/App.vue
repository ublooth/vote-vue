<template>
  <div id="app">
    <siginSw />
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>


<script>
import siginSw from './components/signSw'
export default {
  name: 'App',
  components: {
    siginSw
  },
  created() {
    this.$store.commit('judgeLogin')
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
