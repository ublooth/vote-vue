<template>
    <div class="list" :key="indexs">
        <div class="user" @click="see($event)">
            <div class="headpor">
                <a href="javavsript:" @click="jascr">
                    <img :src="items.gender == 'boy' ? imgRoute1 : imgRoute2">
                </a>
            </div>
            <div class="ticket">
                <p class="animated" v-bind:class="{tada:style1}">{{ticket}}票</p>
                <div class="but" :id="items.id">投TA一票</div>
            </div>
            <div class="name">
                <a href="javavsript:" @click="jascr">
                    <span class="fef">{{items.username}}</span>
                    <span class="thaa" style="margin: 0 6px;">|</span>
                    <span class="thaa">编号#{{items.id}}</span>
                    <p>{{items.descrption}}</p>
                </a>
            </div>
        </div>
        <div v-if="asd">没有您查询的信息</div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props:['items','indexs'],//定义属性
    data:function() {
        return {
            href:"",
            // 图片src属性通过判断语句引入需要require方法
            imgRoute1:require("../assets/boy.png"),
            imgRoute2:require("../assets/girl.png"),
            userInfor:"/detail/",
            asd:false,
            voteId:"",
            userId:"",
            ticket:"",
            style1:false,
        }
    },
    //created 实例创建完成后被立即调用
    created:function() {
        this.ticket = this.items.vote
        console.log('this.111', this.$store.state.login.userInfo)
    },
    methods: {
        see($event) {
            if($event.target.className == "but") {
                if(JSON.parse(localStorage.getItem("data"))) {
                    this.userId = JSON.parse(localStorage.getItem("data")).id;
                    axios({
                        method: "GET",
                        url: "/vote/index/poll?id=" + $event.target.id + "&voterId=" + this.userId
                    }).then(res => {
                        if (res.data.errno === 0) {
                                this.ticket += 1;
                                this.style1 = true;
                            } else {
                                alert(res.data.msg);
                            }
                    })
                } else {
                    this.$emit("notLogin")
                }
                
            }
        },
        loginDisplay() {
            this.$emit('logonEvents')
        },
        jascr() {
            if(JSON.parse(localStorage.getItem("data"))) {
                location.href = 'http://localhost:8081/#'+ this.userInfor + this.items.id;
            } else {
                this.loginDisplay()
            }
        }
    },
}
</script>
<style>
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

/* 用户列表 */
.list {
    width: 100%;
    height: auto;
    background: #effbff;
    /* padding-top: 5px; */
}
.user {
    margin-bottom: 5px;
    border-bottom: 1px solid #e8e3e7;
    height: 80px;
    width: 100%;
    background: #fff;
}
.headpor {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 15px 8px 0 10px;
    vertical-align: middle;
    float: left;
}
.name {
    margin: 0px 0 0 70px;
    padding: 18px 0 0 0;
}
.name span {
    font-size: 14px;
}
.fef {
    color: #1f1e1f;
}
.thaa {
    color: #9a9a9a;
}

.name p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    margin-top: 8px;
    /* width: 100%; */
    color: #9a9a9a;
}
.ticket {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    float: right;
    margin: 15px 8px 0 0;
}
.ticket p {
    font-size: 14px;
    color: #ff7c50;
}
.ticket div {
    width: 75px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: #52aaef;
    font-size: 12px;
    border-radius: 12px;
    color: #fff;
    margin-top: 10px;
    box-shadow: 0px 3px 3px rgba(156, 211, 255, 0.98)
}
</style>