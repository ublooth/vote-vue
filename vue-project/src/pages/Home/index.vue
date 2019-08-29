<template>
    <div>
        <headTemplate @logonEvents="loginDisplay" :mys="my" :hrefss="hrefs"/><!-- 头部组件 -->
        <userList v-for="(item,index) in list" :key="index" :items="item" :indexs="index" @notLogin="notLogin2"/><!-- 用户列表 -->
        <div class="top">{{top}}</div>

        <div class="deng" v-if="hide" @click="loginHide"></div>
        <div class="zxs" v-if="hide">
            <form class="den" id="myform" v-if="hide3">
                <p>{{please}}</p>
                <input id="num" type="text" placeholder="请填写用户编号" v-model="signData.id"><br>
                <input id="pwd" type="password" placeholder="请填写用户密码" v-model="signData.password"><br>
                <input type="button" id="submit" value="提交" @click="signIn"><br>
                <span class="f-s">{{not}}</span>  
                <a href="javascript:">{{signUp}}</a>
            </form>  
            <div class="den" v-if="hide2">
                <div style="font-size:30px;color:red;padding:10px 0;">Welcome</div>
                <div id="kaka" style="font-size:30px;color:red;margin: 10px 0;">{{username}}</div>
                <div id="signOut" @click="signOut">退出登入</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import headTemplate from './header.vue';
import userList from '../../components/user.vue';

export default {
    components: {
        headTemplate,
        userList
	},
    data:function() {
        return {
            please:"请输入用户信息进行验证",
            not:"没有用户名和编号？",
            signUp:"请先进行报名",
            username:"",
            list:null,
            hide:false,
            hide2:false,
            hide3:true,
            signData: {password:'',id:''},
            my:"我要报名",
            hrefs:"/register",
            detailId:"",
            limit:10,
            flag:true,
            top:"加载更多...",
            length:null,
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
                        // this.hide = false;
                        this.hide2 = true;
                        this.hide3 = false;
                        this.detailId = res.data.id;
                        this.hrefs = "/detail/:id" + this.detailId;
                        this.username = res.data.user.username;
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
        // 用户登录
        signIn() {
            axios({
                method:"POST",
                url:"/vote/index/info",
                data: {
                    password:this.signData.password,
                    id:this.signData.id
                }
            }).then(res => {
               if(res.data.errno == 0) {
                   // 本地存储数据
                   localStorage.setItem("data",JSON.stringify({id:this.signData.id,password:this.signData.password,username:res.data.user.username}));
                   alert("登录成功");
                   this.my = "个人主页";
                   this.hide = false;
                   this.hide2 = true;
                   this.hide3 = false;
                   this.detailId = res.data.id;
                   this.hrefs = "/detail/:id" + this.detailId;
                   this.username = res.data.user.username;
                   this.signData = {password:'',id:''};
               }
            });
        },
        // 退出登录
        signOut() {
            this.hide = false;
            this.hide2 = false;
            this.hide3 = true;
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
* {
    margin: 0;
    padding: 0;
}
img {
    width: 100%;
    height: auto;
}
a {
    color: #333;
    text-decoration: none;/*清除下划线*/
    /* display: inline-block; */
}
.f-s14 {
    font-size: 14px;
}
.jiacu {
    font-weight: bolder;
}
body {
    /* font-size: 0; */
    background: #effbff;
}
/* 登入 */
.deng {
    position: fixed;
    top: 0;
    background:rgba(0, 0, 0,0.4);
    width: 100%;
    height: 100%;
}
.zxs {
    position: fixed;
    top: 220px;
    width: 100%;
}
.den {
    width: 70%;
    height: 170px;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;
    text-align: center;
}
.den p {
    font-size: 18px;
    padding-top: 5px;
}
.den input[type="text"],
.den input[type="password"] {
    border: #52aaef 1px solid;
    height: 26px;
    width: 75%;
    border-radius: 8px;
    padding-left: 5px;
    margin: 10px 0 0 0;

}
.den input[id="submit"] {
    height: 26px;
    background: #42a2e6;
    color: #fff;
    font-size: 14px;
    line-height: 26px;
    width: 25%;
    border: none;
    border-radius: 15px;
    margin: 10px 0 5px;
    text-align: center;
}
.den a {
    font-size: 14px;
    color: #ff8b62;
    text-decoration: underline;
}
input {
    outline:none;
}
#signOut{
    font-size: 14px;
    color: white;
    height: 25px;
    width: 30%;
    line-height: 25px;
    background: #03A9F4;
    border-radius: 10px;
    margin: 25px auto 0;
}
.top {
    font-size: 16px;
    text-align: center;
}
</style>
