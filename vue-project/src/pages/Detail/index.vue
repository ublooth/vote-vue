<template>
  <div>
      <div style="heigth: 20px; font-size: 30px">
			{{ $store.state.count }}
			
		</div>
	  <div class="head3">
        <div class="headImg3">
            <div class="title3">
                <img :src="user.gender == 'boy' ? imgRoute1 : imgRoute2">
            </div>
            <div class="name3">
                <p>{{user.username}}</p>
                <p>编号#{{user.id}}</p>
            </div>
            <div class="ranking3">
                <p>{{user.rank}}名</p>
                <p>{{user.vote}}票</p>
            </div>
            <div class="autograph3">
                <p>{{user.descrption}}</p>
            </div>
            <div class="sign3">
                <a href="/#/">活动首页</a>
            </div>
        </div>
    </div>
    <!-- 投票列表 -->
    <div class="box3">
        <div class="left3">
            <span class="line3"></span>
            <span class="round3"></span>
        </div>
        <div class="cen3">
            已投票的好友
        </div>
        <div class="right3">
            <span class="round3"></span>
            <span class="line3"></span>
        </div>
    </div>
        <div class="list3" v-for="(item,index) in voteUser" :key="index">
            <div class="term3">
                <div class="headpor3">
                    <a href=""><img :src="item.gender == 'boy' ? imgRoute1 : imgRoute2"></a>
                </div>
                <div class="listname3">
                    <p>{{item.username}}</p>
                    <p>编号#{{item.id}}</p>
                </div>
                <div class="throw3">
                    <p>投了一票</p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
	data:function() {
		return {
			detailId:"",
			user:"",
			voteUser:"",
			imgRoute1:require("../../assets/boy.png"),
            imgRoute2:require("../../assets/girl.png")
		}
	},
	//vue实例挂载完成
	mounted() {
        // console.log(this.$route.params.id)
		this.detailId = this.$route.params.id;
		axios({
			method: "GET",
			url: "/vote/all/detail/data?id=" + this.detailId
		}).then(res => {
			if(res.data.errno === 0) {
				this.user = res.data.data;
				this.voteUser = res.data.data.vfriend;
			}
		})
	},
}
</script>

<style >
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

.f-s {
    font-size: 12px;
}
.f-s14 {
    font-size: 14px;
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
.headImg3 {
    width: 100%;    
    height: 202px;
    background: url(../../assets/bgone.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.title3 {
    display: inline-block;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 24px 10px 0 18px;
    vertical-align: middle;
}
.name3 {
    margin: 24px 0px 0 0px;
    display: inline-block;
    vertical-align: middle;
}
.name3 p {
    line-height: 20px;
    color: #fff;
    font-size: 14px;
}
.ranking3 {
    text-align: right;
    margin: 14px 0px 0 0px;
    display: inline-block;
    vertical-align: middle;
    float: right;
    margin-right: 20px;
}
.ranking3 p:first-child {
    color: #ff8a62;
    font-size: 22px;
}
.ranking3 p:last-child {
    color: #fff;
    font-size: 14px;
    margin-top: 10px;
}
.autograph3 {
    text-align: center;
    font-size: 18px;
    color: #fff57f;
    margin-top: 5px;
}
.autograph3 p {
    width: 80%;
    margin: 0 auto;
}
.sign3 {
    text-align: center;
    margin-top: 14px;
}
.sign3 a {
    display: inline-block;
    width: 110px;
    height: 30px;
    background: #ff8a63;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    line-height: 30px;
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.3);
}
/* 投票列表 */
.box3 {
    margin-top: 40px;
    text-align: center;
}
span3 {
    vertical-align: middle;
    display: inline-block;
}
.left3,
.right3 {
    vertical-align: middle;
    width: 31%;
    display: inline-block;
}
.line3 {
   
    width:90%;
    height: 1px;
    background: #ff8a63;
}
.round3 {
    width: 5px;
    height: 5px;
    border-radius: 3px;
    background: #ff8a63;
}
.cen3 {
    vertical-align: middle;
    margin: 0 5px;
    display: inline-block;
    width: 28%;
    height: 25px;
    background: #ff8a63;
    line-height: 25px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    border-radius: 13px;
}
.right3 {
    text-align: right;
}
.list3 {
    margin-top: 25px;
}
.term3 {
    height: 70px;
    width: 100%;
    border-bottom: #e3e8e8 1px solid;
}
.headpor3 {
    display: inline-block;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px;
    vertical-align: middle;
}
.listname3 {
    display: inline-block;
    vertical-align: middle;
}
.listname3 p:first-child {
    color: #323131;
    font-size: 14px;
}
.listname3 p:last-child {
    color: #949597;
    font-size: 14px;
}
.throw3 {
    margin: 10px;
    float: right;
    font-size: 14px;
    color: #323131;
}
.topbor3 {
    border-top: #dddddc 1px solid;
}

</style>
