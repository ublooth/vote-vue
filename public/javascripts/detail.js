// import { get } from "https";

$(document).ready(function(){
    //个人主页
    var pathname = location.pathname;
    // console.log('pathname',pathname)
    // console.log('typeof',typeof pathname)
    var idpost = localStorage.getItem("id");
    // var pwdpost = localStorage.getItem("tad");
    // console.log(idpost)
    // console.log(pwdpost)
    function homeInit() {
        if (idpost) {
            $.ajax({
                type: "get",
                url: "/vote/all/detail/data?id=" + idpost,
                success: function (item) {
                    // console.log('data',item)
                    item = JSON.parse(item);
                    // console.log('data2',item)
                    // console.log('data2typeof',typeof item)
                    // console.log('data3',item.data.username)
                    if (item.errno === 0) {
                        var str = "";
                        str += `
                        <div class="title">
                            <img src="${item.data.head_icon}">
                        </div>
                        <div class="name">
                            <p> ${item.data.username}</p>
                            <p>编号#${item.data.id}</p>
                        </div>
                        <div class="ranking">
                            <p>${item.data.rank}名</p>
                            <p>${item.data.vote}票</p>
                        </div>
                        <div class="autograph">
                            <p>${item.data.descrption}</p>
                        </div>
                        <div class="sign">
                            <a href="/vote/index">活动首页</a>
                        </div>
                        `;
                        $(".headImg").html(str);
                        // console.log(str)
                        var arr = item.data.vfriend;
                        // console.log('arr',arr);
                        var str2 = "";
                        arr.forEach(function (item) {
                            // console.log(item.username);
                            str2 += `
                            <div class="term">
                                <div class="headpor">
                                    <a href=""><img src="${item.head_icon}"></a>
                                </div>
                                <div class="listname">
                                    <p>${item.username}</p>
                                    <p>编号#${item.id}</p>
                                </div>
                                <div class="throw">
                                    <p>投了一票</p>
                                </div>
                            </div>
                            `;
                        });
                        $(".list").html(str2);
                    }
                }
            });
        }
    }
    // console.log('1',window.location.pathname)
    var id = window.location.pathname.split("/");
    var postId = id[id.length - 1];
    // console.log('2',id )
    // console.log('3',postId)
    // console.log('typeof',typeof postId)
    postId = Number(postId);
    function registerInit() {
        if (postId) {
            // console.log('2222')
            $.ajax({
                type: "get",
                url: "/vote/all/detail/data?id=" + postId,
                success: function (item) {
                    // console.log('data',item)
                    item = JSON.parse(item);
                    // console.log('data2',item)
                    // console.log('data2typeof',typeof item)
                    // console.log('data3',item.data.username)
                    if (item.errno === 0) {
                        var str = "";
                        str += `
                        <div class="title">
                            <img src="${item.data.head_icon}">
                        </div>
                        <div class="name">
                            <p> ${item.data.username}</p>
                            <p>编号#${item.data.id}</p>
                        </div>
                        <div class="ranking">
                            <p>${item.data.rank}名</p>
                            <p>${item.data.vote}票</p>
                        </div>
                        <div class="autograph">
                            <p>${item.data.descrption}</p>
                        </div>
                        <div class="sign">
                            <a href="/vote/index">活动首页</a>
                        </div>
                        `;
                        $(".headImg").html(str);
                        // console.log(str)
                        var arr = item.data.vfriend;
                        // console.log('arr',arr);
                        var str2 = "";
                        arr.forEach(function (item) {
                            // console.log(item.username);
                            str2 += `
                            <div class="term">
                                <div class="headpor">
                                    <a href=""><img src="${item.head_icon}"></a>
                                </div>
                                <div class="listname">
                                    <p>${item.username}</p>
                                    <p>编号#${item.id}</p>
                                </div>
                                <div class="throw">
                                    <p>投了一票</p>
                                </div>
                            </div>
                            `;
                        });
                        $(".list").html(str2);
                    }
                }
            });
        }
    }
    if (pathname == "/vote/detail") {
        homeInit()
    } else if (/\d/.test(pathname)){
        registerInit()
    }
});