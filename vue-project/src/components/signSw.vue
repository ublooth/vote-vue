<template>
  <!-- <div v-if="$store.state.login.show" class="wrapper" @click="close"> -->
  <div v-if="show" class="wrapper" @click="close">
		<div>弹窗</div>

		<div>
			<div v-if="$store.state.login.userInfo">已经登入</div>
			<div v-else>未登入</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	created() {
	},
	methods: {
		close() {
			console.log(123)
			this.$store.commit('close')
		}
	},
	computed: mapState({
    // 箭头函数可使代码更简练
    show: state => state.login.show,
  })
}
</script>

<style>
.wrapper {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.3);;
	color: #fff;
	z-index: 10000;
}
</style>