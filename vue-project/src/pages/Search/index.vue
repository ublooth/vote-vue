<template>
  <div>
    <userList
      v-for="(itemb,indexb) in lists"
      :key="indexb"
      :items="itemb"
      :indexs="indexb"
    />
    <!-- 用户列表 -->
    <!-- <signIn/> -->
    <!--  登入组件 -->
  </div>
</template>
<script>
import userList from "../../components/user.vue";
// import signIn from "../../components/signIn.vue";
import axios from "axios";
export default {
  components: {
    userList,
    // signIn
  },
  data: function() {
    return {
      lists: "",
      content: "",
      // hide: false
    };
  },
  //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
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
    
  }
};
</script>
<style>
</style>