<template>
    <div class="box" v-if="$route.path === '/' || /detail/.test($route.path)">
        {{ $route.path }}
        <div :class="{'active': $route.path === '/'}" >
            首页
        
            </div>
        <div :class="{'active': /detail/.test($route.path)}">详情页</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.box {
    position:fixed;
    bottom: 0px;
    color: #000;
    font-size: 30px;
}
.active {
    color: blue;
}
</style>