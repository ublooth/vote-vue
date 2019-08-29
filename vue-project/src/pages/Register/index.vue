<template>
    <div>
        <div class="head2">
            <div class="headImg2">
                <div class="title2">
                    <img class="animated tada" src="../../assets/title.png">
                </div>
            </div>
        </div>
        <div class="inrorm">
            <form action="" class="myform">
                <p>{{username}}</p>
                <input type="text" placeholder="请填写用户名" v-model="data.username">
                <p>{{pwd}}</p>
                <input type="password" placeholder="数字或字母不超过10个长度" maxlength="10"  v-model="data.password">
                <p>{{pwd2}}</p>
                <input type="password" placeholder="数字或字母不超过10个长度" maxlength="10" v-model="password2">
                <p>{{phone}}</p>
                <input type="text" placeholder="请填写正确格式的手机号码" maxlength="11" v-model="data.mobile">
                <p>{{describe}}</p>
                <input type="text" placeholder="请填写自我描述（20字以内）" maxlength="20" v-model="data.descrption">
                <p>{{sex}}</p>

                <input class="gender" type="radio"  id="boy" value="boy" v-model="data.gender"><label for="boy">{{
                    boy}}</label>
                <br>
                <input class="gender" type="radio" id="girl" value="girl" v-model="data.gender"><label for="girl">{{
                    girl}}</label>
                <br>
                <input class="sub" type="button" value="提交" @click="sub">
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data:function() {
        return {
            username:"用户名：",
            pwd:"密码：",
            pwd2:"确认密码：",
            phone:"手机号码：",
            describe:"自我描述：",
            sex:"性别：",
            boy:"男",
            girl:"女",
            password2:'',
            data:  {
			       username: '',
				   mobile: '',
				   descrption: '',
				   gender: 'boy',
				   password: '',
			   }
        }    
    },
    methods:{
        sub() {
            // console.log(this.data)
            if(!this.data.username) {
                alert("请填写用户名称");
                return;
            }
            if(!this.data.password) {
                alert("密码不能为空");
                return;
            }
            if(/^[0-9a-zA-Z]{1,10}$/.test(this.data.password) === false) {
                alert("密码必须为数字或字母且不超过10个长度");
                return;
            }
            if(this.data.password != this.password2) {
                alert("两次密码不一致");
                return;
            }
            if(/^1(3|4|5|7|8)\d{9}$/.test(this.data.mobile) === false) {
                alert("手机号码格式错误");
                return;
            }
            // console.log(this.data)
            axios({
                method: "POST",
                url: "/vote/register/data",
                data:this.data
            }).then(res => {
                if(res.data.errno == 0) {
                    console.log(res)
                    localStorage.setItem("data",JSON.stringify({id:res.data.id,password:this.data.password,username:this.data.username}));
                    alert(res.data.msg);
                    location.href = 'http://localhost:8081/#/';
                } else {
                    alert('报名失败');
                }
            })
        }
    }
}
</script>
<style>
/* 默认样式 */
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
ul {
    list-style: none;
}
a {
    color: #333;
    text-decoration: none;/*清除下划线*/
    /* display: inline-block; */
}
.f-s00{
    font-size: 0px;
}
.f-s {
    font-size: 12px;
}
.f-s14 {
    font-size: 14px;
}
.jiacu {
    font-weight: bolder;
}
img {
    width: 100%;
    height: auto;
}
body {
    font-size: 0;
    background: #effbff;
}
/* 头部 */
.headImg2 {
    width: 100%;    
    height: 172px;
    background: url(../../assets/bgone.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.title2 {
    padding: 15px 0 0 0;
    margin: 0px auto;
    width: 208px;
}
/* 表单 */
.inrorm {
    width: 100%;
    height: 630px;
    
}
.myform {
    font-size: 16px;
    margin: 0 auto;
    width: 83%;
    padding-top: 15px;
}
.myform p {
    font-size: 18px;
    color: #2c97e5;
}
.myform input {
    outline: none;
    width: 100%;
    height: 30px;
    border: 1px solid #8aceff;
    border-radius: 5px;
    font-size: 16px;
    text-indent: 1em;
    margin-top: 5px;
    margin: 5px 0 24px 0;
}
.myform input.gender {
    width: 20px;
    vertical-align: middle;
    margin: 0 8px 0 0;
}
input[type="radio"] + label::before {
    content: "\a0";
     /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 24px;
    height: 24px;
    margin-right: .4em;
    border-radius: 50%;
    border: 1px solid #2c97e5;
    text-indent: .15em;
    line-height: 1; 
    margin: 5px;
}
input[type="radio"]:checked + label::before {
    /* background-color: #2c97e5; */
    background-clip: content-box;
    /* padding: .2em; */
    background-image: radial-gradient(circle,#fff, #2c97e5);
}
input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
.myform input.sub {
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    background: #52aaef;
    color: #fff;
    font-size: 20px;
    text-align: center;
    text-indent: 0;
    display: block;
    margin: 22px auto 0;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
}
</style>