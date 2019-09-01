<template>
  <div>
    <userList
      v-for="(itemb,indexb) in lists"
      :key="indexb"
      :items="itemb"
      :indexs="indexb"
      @notLogin="notLogin2"
      @logonEvents="loginDisplay"
    />
    <!-- 用户列表 -->
    <signIn :signInHide="hide" @loginHide="loginHide" />
    <!--  登入组件 -->
  </div>
</template>
<script>
import userList from "../../components/user.vue";
import signIn from "../../components/signIn.vue";
import axios from "axios";
export default {
  components: {
    userList,
    signIn
  },
  data: function() {
    return {
      lists: "",
      content: "",
      hide: false
    };
  },
  mounted() {
    console.log(this.$route.params);
    axios({
      method: "GET",
      url: "/vote/index/search?content=" + this.$route.params.id
    }).then(res => {
      if (res.data.errno === 0 && res.data.data.length === 1) {
        this.lists = res.data.data;
      }
    });
  },
  methods: {
    // 点击投票没有登录
    notLogin2() {
      this.hide = true;
    },
    // 点击图片信息查看详情没有登录
    loginDisplay() {
      this.hide = true;
    },
    // 隐藏登录页面
    loginHide() {
      this.hide = false;
    }
  }
};
</script>
<style>
</style>