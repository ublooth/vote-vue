<template>
    <div>
        <div class="head">
            <div class="left"><span class="f-s14" @click="loginDisplay">用户登入</span></div>
            <div class="right2"><a href="javascript:" class="f-s14" @click="hdgz">活动规则</a></div>
            <div class="head-img">
                <img src="../../assets/title.png" class="animated tada">
                <div class="sign">
                    <router-link id="my" :to="hrefss" v-text="mys"></router-link>
                </div>
            </div>
            <form class="please">
                <input class="text" type="text" placeholder="请输入用户名称或编号" v-model="content">
                <!-- <div class="button" @click="search">搜索</div> -->
                <router-link class="button" :to="tocontent + content">搜索</router-link>
            </form>
        </div>
    </div>
</template>
<script>
import Axios from 'axios';
export default {
    props:["mys","hrefss"],
    data:function() {
        return {
            content:"",
            tocontent:"/search/",
        }
    },
    methods:{
        // 登入页显示,触发事件
        loginDisplay() {
            this.$emit('logonEvents')
        },
        // 搜索点击事件
        // search() {
        //     if(JSON.parse(localStorage.getItem("data"))) {
        //         location.href = 'http://localhost:8081/#'+ this.tocontent + this.content;
        //     } else {
        //         this.loginDisplay()
        //     }
        // },
        hdgz() {
            if(JSON.parse(localStorage.getItem("data"))) {
                // location.href = 'http://localhost:8081/#'+ ;
                // alert(`    
                //                   一个人最多投五票
                //           只有注册用户才可以有权限投票
                //           一个帐号不能重复投给同一个人
                //                用户也可以将票投给自己`)
                // 没有写活动规则页面
            } else {
                this.loginDisplay()
            }
        }
    }
}
</script>
<style>
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
.head {
    width: 100%;
    height: 333px;
    background: #73bef7;
    border-bottom: #3fa0e6 2px solid;
}
.left a,
.right2 a {
    color: #01487e;
}
.left,
.right2 {
    display: inline-block;
    border-bottom: #01487e 1px solid;
}
.left {
    margin: 12px 0 0 14px;
}
.right2 {
    float: right;
    margin: 12px 14px 0 0;
    font-size: 14px;
}
.head-img {
    width: 245px;
    margin: 0 auto;
}
.sign {
    text-align: center;
    margin-top: 14px;
}
.sign a {
    display: inline-block;
    width: 134px;
    height: 40px;
    background: #ff8a63;
    border-radius: 20px;
    color: #fff;
    font-size: 20px;
    line-height: 40px;
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.3);
}
.please {
    font-size: 0;
    width: 80%;
    margin:15px auto 0;
}
.please .text {
    vertical-align: top;
    width: 85%;
    height: 35px;
    border-bottom-left-radius: 17.5px;
    border-top-left-radius: 17.5px;
    border: 1px solid #42a2e6;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 14px;
    outline: none;
}
.please .button {
    color: #fff;
    text-align: center;
    line-height: 35px;
    font-size: 14px;
    display: inline-block;
    width: 15%;
    height: 35px;
    border: none;
    border-bottom-right-radius: 17.5px;
    border-top-right-radius: 17.5px;
    background:  #42a2e6;
}
</style>