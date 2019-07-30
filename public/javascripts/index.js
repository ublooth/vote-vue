$(document).ready(function() {
    
    // console.log(123);
    function userList(){
        $.ajax({
            type:"get",
            // url:"/vote/index/data?limit=10&offset=0",
            url:"/vote/index/data?limit=20&offset=0",
            data: "",
            success: function (response) {
                response = JSON.parse(response);
                console.log('12',response);
                if (response.errno === 0) {
                    var html = '';
                    var objects = response.data.objects;
                    console.log('22',objects);
                    objects.forEach(function(item) {
                        html +=
                        `<div class="user">
                                <div class="headpor">
                                    <a href="javascript:"><img src="${item.head_icon}"></a>
                                </div>
                                <div class="ticket">
                                    <p>${item.vote}票</p>
                                    <input type="button" value="投TA一票">
                                </div>
                                <div class="name">
                                    <a href="javascript:">
                                        <span class="fef">${item.username}</span>
                                        <span class="thaa" style="margin: 0 6px;">|</span>
                                        <span class="thaa">编号#${item.id}</span>
                                        <p>${item.descrption}</p>
                                    </a>
                                </div>
                            </div>`
                    });
                    // for(var i = 0; i < objects.length; i++) {
                    //     var user = objects[i];
                    //     console.log('33',user);
                    //     html +=
                    //     `<div class="user">
                    //             <div class="headpor">
                    //                 <a href=""><img src="${user.head_icon}"></a>
                    //             </div>
                    //             <div class="ticket">
                    //                 <p>${user.vote}票</p>
                    //                 <input type="button" value="投TA一票">
                    //             </div>
                    //             <div class="name">
                    //                 <a href="">
                    //                     <span class="fef">${user.username}</span>
                    //                     <span class="thaa" style="margin: 0 6px;">|</span>
                    //                     <span class="thaa">编号#${user.id}</span>
                    //                     <p>${user.descrption}</p>
                    //                 </a>
                    //             </div>
                    //         </div>`
                    // }
                    $('.list').html(html);
                } else {
                    alert('获取用户数据错了');
                }
                console.log('response', response);
            }
        });
    }
    userList();

//登入页显示隐藏
    $('.left').click(function(){
        $('.deng').css('display','block');
        $('.zxs').css('display','block');
    });
    $('.deng').click(function(){
        $('.deng').css('display','none');
        $('.zxs').css('display','none');
    });

    // 登入
    $('#submit').click(function(){
        var num = $('#num').val();
        var pwd = $('#pwd').val();
        $.ajax({
            type: "POST",
            url: "/vote/index/info",
            data: {
                password: pwd,
                id: num
            },
            success:function(response){
                response = JSON.parse(response);
                if (response.errno === 0) {
                    alert('登入成功');
                    $(".den")[0].reset();
                    $('.deng').css('display','none');
                    $('.zxs').css('display','none');

                    // js本地存储：localStorage
                    var id = num;
                    localStorage.setItem("temp", id);
                    // console.log(localStorage.getItem("temp"));
                    //本地存储id的值
                    var ida = localStorage.getItem("temp");
                    var objects = response;
                    if (ida == objects.user.id) {
                        // alert('welcome' + objects.user.username);
                        $(".den").css('display','none');
                        $(".welcome").css('display','block');
                        $("#kaka").html(objects.user.username);
                        $("#my").html('个人主页');
                        $("#my").attr('href','http://localhost:8080/vote/detail')

                        
                    } 
                    // console.log('lobjects',objects);
                    // console.log('user',objects.user);
                    // console.log('username',objects.user.username);
                    
                    
                } else {
                    alert('用户编号或密码错误！')
                }
               
               

            }
        });
        // js本地存储：localStorage
        // var arr = [1, 2, 3];
        // localStorage.setItem("temp", arr); //存入 参数： 1.调用的值 2.所要存入的数据 
        // console.log(localStorage.getItem("temp"));//输出
        // JSON对象转JSON字符串
        // var obj = { "a": 1, "b": 2 };
        // obj = JSON.stringify(obj); //转化为JSON字符串
        // localStorage.setItem("temp2", obj);
        // //JSON字符串转JSON对象
        // obj = JSON.parse(localStorage.getItem("temp2"));
    });
    //退出登入
    $("#signOut").click(function(){
        window.localStorage.clear();
        location.href = '/vote/index';
    });

});