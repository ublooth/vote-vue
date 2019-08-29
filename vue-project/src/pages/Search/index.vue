<template>
    <div>
        <userList v-for="(itemb,indexb) in lists" :key="indexb" :items="itemb" :indexs="indexb"/><!-- 用户列表 -->
    </div>
</template>
<script>
import userList from '../../components/user.vue';
import axios from 'axios';
export default {
    components: {
        userList
	},
    data:function() {
        return {
            lists:"",
            content:"",
        }
    },
    mounted() {
        // console.log(this.$route.params.id)
        // console.log(this.$route.params.id.split('id'))
        console.log(this.$route.params)
        axios({
            method: "GET",
            url: "/vote/index/search?content=" + this.$route.params.id
        }).then(res => {
            // console.log(res)
            // console.log(res.data.data.length)
            if(res.data.errno === 0 && res.data.data.length ===1) {
                this.lists = res.data.data;
            }
        })
    }
}
</script>
<style>

</style>