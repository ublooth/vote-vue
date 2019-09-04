<template>
	<div>
		<headTemplate/><!-- 头部组件 -->
		<userList v-for="(item,index) in list" :key="index" :items="item" :indexs="index"/><!-- 用户列表 -->
		<div class="top">{{top}}</div>
		<!-- <signIn/> --> <!-- 登入组件 -->
	</div>
</template>

<script>
import axios from 'axios';
import headTemplate from './header.vue';
import userList from '../../components/user.vue';
// import signIn from '../../components/signIn.vue';
import { mapStata,mapMutations } from 'vuex';// 导入辅助函数.
import share from '../shareJS/share';//传函数方法过来
export default {
	components: {
		headTemplate,
		userList,
		// signIn
	},
	data:function() {
		return {
			username:"",
			list:null, 
			signData: {password:'',id:''},
			hrefs:"/register",
			detailId:"",
			limit:10,
			flag:true,
			top:"加载更多...",
			length:null,
			signInHide:false,
		}
	},
	//created 实例创建完成后被立即调用
	created:function() {
		this.load();
	},
	mounted(){
		window.addEventListener('scroll',this.handleScroll);// 监听（绑定）滚轮滚动事件
	},
	methods:{
		...mapMutations([
			'increment',
		]),
	// mapMutations通过扩展运算符将store.commit('increment') 映射this.$store.commit('increment')  这个this 很重要，这个映射直接映射到当前Vue的this对象上。mapActions, mapMutations都是一样的道理
		add() {
			this.$store.commit('increment')
		},
		dec() {
			this.$store.commit('decrement')
		},
		load() {
			// 主页列表请求
			axios({
					method: "GET",
				url: "/vote/index/data?limit="+ this.limit +"&offset=0"
			}).then(res => {
					if(res.data.errno == 0) {
							this.list = res.data.data.objects;
					}
			});
			this.flag = false;
		},
		// 滚动事件,数据加载
		handleScroll() {
			let clientHeight = document.body.clientHeight;// 网页可见区域高
			let scrollObj = window.screen.height; // 可视窗口高度
			let scrollTop = document.documentElement.scrollTop //滚动条距离最顶端的距离
				//当网页滚动条拉到最底端时
			if(scrollTop + scrollObj === clientHeight){
				if(this.flag == false) {
					this.flag = true;
					//  箭头函数的运用，this会指向外层
					//  if(this.limit > this.list.length) {
					//      setTimeout(() => this.top = "全部加载完成～",1000);
					//      return;
					//  } else {
					//     this.limit += 10;
					//     setTimeout(() => this.load(),1000);
					//  }
					// 方法2
					var that = this;//保存当前实例的this
					if(this.limit > this.list.length) {
						setTimeout(function() {
								that.top = "全部加载完成～"
						},1000);
						return;
					} else {
						this.limit += 10;
						setTimeout(function() {
								that.load()
						},1000);
					}
				}
			}  
		}
	}
}
</script>

<style >
.top {
    font-size: 16px;
    text-align: center;
}
</style>
