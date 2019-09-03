<template>
  <div id="app">
    <siginSw />
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <Nav />
  </div>
</template>


<script>
import Nav from './components/Nav'
import siginSw from './components/signSw'

export default {
  name: 'App',
  components: {
    siginSw,
    Nav
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
