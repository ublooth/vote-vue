<template>
	<div>
			<headTemplate @logonEvents="loginDisplay" :mys="my" :hrefss="hrefs"/><!-- 头部组件 -->
			<userList v-for="(item,index) in list" :key="index" :items="item" :indexs="index" @notLogin="notLogin2" @logonEvents="loginDisplay"/><!-- 用户列表 -->
			<div class="top">{{top}}</div>
			<signIn
			 :signInHide="hide"
			 @loginHide="loginHide"
			 @signOut="signOut"
			 @success="userSuccess"/><!-- 登入组件 -->
	</div>
</template>

<script>
import axios from 'axios';
import headTemplate from './header.vue';
import userList from '../../components/user.vue';
import signIn from '../../components/signIn.vue';
import share from '../shareJS/share';//传函数方法过来
export default {
	components: {
			headTemplate,
			userList,
			signIn
},
	data:function() {
			return {
				username:"",
				list:null, 
				hide:false,
				// userNameHides:false,
				// loginFormHides:true,
				signData: {password:'',id:''},
				my:"我要报名",
				hrefs:"/register",
				detailId:"",
				limit:10,
				flag:true,
				top:"加载更多...",
				length:null,
				signInHide:false
			}
	},
	//created 实例创建完成后被立即调用
	created:function() {
		this.load();
		if(JSON.parse(localStorage.getItem("data"))) {
				this.signData.password = JSON.parse(localStorage.getItem("data")).password;
				this.signData.id = JSON.parse(localStorage.getItem("data")).id;
				axios({
					method:"POST",
					url:"/vote/index/info",
					data: {
						password:this.signData.password,
						id:this.signData.id
					}
				}).then(res => {
					if(res.data.errno == 0) {
						this.my = "个人主页";
						this.detailId = res.data.id;
						this.hrefs = "/detail/" + this.detailId;
						this.username = res.data.user.username;
						// this.loginFormHides = false;
						// this.userNameHides = true;
						this.signData = {password:'',id:''};
					}
				});
		} else {
				return;
		}
},
mounted(){
		window.addEventListener('scroll',this.handleScroll);// 监听（绑定）滚轮滚动事件
},
methods:{
	load(){
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
	// 登入显示页/隐藏
	loginDisplay() {
		this.hide = true;
	},
	loginHide() {
		this.hide = false;
	},
	// 用户登录成功
	userSuccess(res) {
		console.log(res)
		this.my = "个人主页";
		this.hide = false;
		this.loginFormHides = false;
		this.userNameHides = true;
		this.detailId = res.data.id;
		this.hrefs = "/detail/" + this.detailId;
		this.username = res.data.user.username;
		this.signData = {password:'',id:''};
	},
	// 退出登录
	signOut() {
		this.hide = false;
		this.my = "我要报名";
		this.hrefs = "/register";
		this.detailId = "";
		window.localStorage.clear();// 清除本地存储的数据
		location.href = '/#/';
	},
	// 点击投票没有登录
	notLogin2() {
		this.hide = true;
		this.hide2 = false;
		this.hide3 = true;
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
