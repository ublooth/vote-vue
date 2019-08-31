<template>
    <div>
        <div class="deng" v-if="hide1" @click="loginHide2"></div>
        <div class="zxs" v-if="hide1">
            <form class="den" id="myform" v-if="hide3">
                <p>请输入用户信息进行验证</p>
                <input id="num" type="text" placeholder="请填写用户编号" v-model="signData.id"><br>
                <input id="pwd" type="password" placeholder="请填写用户密码" v-model="signData.password"><br>
                <input type="button" id="submit" value="提交" @click="signIn"><br>
                <span class="f-s">没有用户名和编号？</span>  
                <a href="#/register">请先进行报名</a>
            </form>  
            <div class="den" v-if="hide2">
                <div style="font-size:30px;color:red;padding:10px 0;">Welcome</div>
                <div id="kaka" style="font-size:30px;color:red;margin: 10px 0;">{{username2}}</div>
                <div id="signOut" @click="signOut2">退出登入</div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex'
export default {
    props:['hide1','hide2','hide3','username2'],
    computed: mapState({
        userInfo: state => state.login.userInfo
    }),
    data:function() {
        return {
            signData: {password:'',id:''}
        }
    },
    methods:{
        loginHide2() {
            this.$emit("loginHide");
        },
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
                    console.log('111',res)
                    this.$emit("success",res)
                }
            });
        },
        signOut2() {
            this.$emit("signOut")

           
        }
    },
    mounted() {
        console.log('userInfo', this.userInfo)
        console.log('userInfo222', this.$store.state.login.userInfo)
    }
}
</script>
<style>
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
</style>