$(document).ready(function() {
    
    // 登入
    $('#submit').click(function(){
        var num = $('#num').val();//用户编号
        var pwd = $('#pwd').val();//密码
        $.ajax({
            type: "POST",
            url: "/vote/index/info",
            data: {
                password: pwd,
                id: num
            },
            success:function(response){
                response = JSON.parse(response);
                console.log('deng',response)
                if (response.errno === 0) {
                     // js本地存储：localStorage
                    var id = num;
                    var pwds = pwd;
                    localStorage.setItem("id",id);//存入用户编号
                    localStorage.setItem("pwd",pwds);//存入密码
                    // alert(response.msg);
                    $('.deng').css('display', 'none');
                    $('.zxs').css('display', 'none');
                    $(".den").css('display', 'none');
                    $(".welcome").css('display', 'block');
                    $("#kaka").html(response.user.username);
                    $("#my").html('个人主页');
                    $("#my").attr('href', 'http://localhost:8080/vote/detail');
                } else {
                    alert(response.msg)
                }
            }
        });
    });
    var idpost = localStorage.getItem("id");//输出
    var pwdpost = localStorage.getItem("pwd");//输出
    if (idpost) {
        $.ajax({
            type: "POST",
            url: "/vote/index/info",
            data: {
                password: pwdpost,
                id: idpost
            },
            success:function(response){
                response = JSON.parse(response);
                console.log('deng',response)
                if (response.errno === 0) {
                    $('.deng').css('display', 'none');
                    $('.zxs').css('display', 'none');
                    $(".den").css('display', 'none');
                    $(".welcome").css('display', 'block');
                    $("#kaka").html(response.user.username);
                    $("#my").html('个人主页');
                    $("#my").attr('href', 'http://localhost:8080/vote/detail');
                } else {
                    alert(response.msg)
                }
            }
        });
    }
    //退出登入
    $("#signOut").click(function(){
        // 清除本地存储的数据
        window.localStorage.clear();
        location.href = '/vote/index';
    });
//登入页显示隐藏
    $('.left').click(function(){
        $('.deng').css('display','block');
        $('.zxs').css('display','block');
    });
    $('.deng').click(function(){
        $('.deng').css('display','none');
        $('.zxs').css('display','none');
    });




//首页用户列表
    var total = 0; // 列表总数
	var flag = false;//设置开关
    function userList(offset,i){
        // console.log("iiii",i);
        var j = i;
        $.ajax({
            type:"get",
            url:"/vote/index/data?limit=10&offset=" + offset,
            // url:"/vote/index/data?limit=20&offset=0",
            data: "",
            success: function (response) {
                response = JSON.parse(response);
                // console.log('12',response);
                if (response.errno === 0) {
                    var html = '';
                    var objects = response.data.objects;
                    total = response.data.total;
                    // console.log('列表总数',total);
                    console.log('objects:',objects);
                    objects.forEach(function(item) {
                        html +=
                        `<div class="user">
                                <div class="headpor">
                                    <a href="javascript:"><img src="${item.head_icon}"></a>
                                </div>
                                <div class="ticket">
                                    <p>${item.vote}票</p>
                                    <div class="but">投TA一票</div>
                                </div>
                                <div class="name">
                                    <a href="javascript:">
                                        <span class="fef">${item.username}</span>
                                        <span class="thaa" style="margin: 0 6px;">|</span>
                                        <span class="thaa taa">编号#${item.id}</span>
                                        <p>${item.descrption}</p>
                                    </a>
                                </div>
                            </div>
                            `;
                        
                    });

                    $('.list').append(html);
                    flag = false;//开关
                } else {
                    alert('获取用户数据错了');
                }
                console.log('$(".but")',$(".but"))
                console.log("jjj",j)
                var z = j; 
                for (var z = j;z < $(".but").length; z++){
                    $(".but").eq(z).click(function(){
                        //当前点击的索引
                        var thisIndex = $(".but").index($(this));
                        //获取编号，被投票者id
                        var isId = $(".taa").eq(thisIndex).html().split('#')[1];
                        //     //获取本地存储的投票者id
                        var idpost = localStorage.getItem("id");
                        if(!idpost){
                        // alert('请先登录账号');
                            $('.deng').css('display', 'block');
                            $('.zxs').css('display', 'block');
                            return;
                        }
                        $.ajax({
                            type: 'GET',
                            url: '/vote/index/poll?id=' + isId + '&voterId=' + idpost,
                            success: function(data){
                                data = JSON.parse(data);
                                // 获取被投票者当前的票数
                                var isNum = Number($(".ticket p").eq(thisIndex).html().split('')[0]);
                                if(data.errno === 0){
                                    isNum = isNum + 1;
                                    // alert(data.msg);
                                    $(".ticket p").eq(thisIndex).html(isNum + '票');
                                    $(".ticket p").eq(thisIndex).addClass("animated tada");
                                } else {
                                    alert(data.msg);
                                }
                            },
                            // 返回数据：errno为0，数据正确	
                        });
                    });
                }
                $(".name").click(function(){
                    //当前点击的索引
                    var thisIndex = $(".name").index($(this));
                    //获取编号，被投票者id
                    var isId = $(".taa").eq(thisIndex).html().split('#')[1];
                    location.href="/vote/detail/"+isId
                });
                $(".headpor").click(function(){
                    //当前点击的索引
                    var thdex = $(".headpor").index($(this));
                    //获取编号，被投票者id
                    var isaId = $(".taa").eq(thdex).html().split('#')[1];
                    location.href="/vote/detail/"+isaId
                });
            }
            
        });
        
    }
    // 首页初始化
    $(function(){
        var offset = 0;//偏移量
        var limit = 10;//每页加载增加的数量
        var i = 0;
        userList(offset,i);//执行函数首页数据
        $(window).scroll(function () {
            var winHei = $(window).height();//浏览器可视窗口的高度
            var winTop = $(window).scrollTop();//浏览器可视窗口顶端距离网页顶端的高度（垂直偏移）
            var docHei = $(document).height();//整个网页的文档高度
            //当网页滚动条拉到最低端时
            if (docHei ==  winHei + winTop) {
                i += 10;
                if (flag === false){
                    flag =true;//开关
                    setTimeout(function () {
                        offset += limit;
                        if (offset > total) {
                            //偏移总量>列表总数时不加载数据
                            $('.top').html('全部加载完成～');
                        } else {
                            userList(offset,i);//执行函数首页数据
                        }
                    }, 1000); 
                }
                
            }
        });   
    });


    // 搜索页搜索内容
    $(".button").click(function(){
        //获取搜索内容
        var content = $(".text").val();
        localStorage.setItem("content",content);//存入
        location.href = "/vote/search";
    });
});