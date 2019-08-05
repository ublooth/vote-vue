$(document).ready(function () {
    var content = localStorage.getItem('content');
    console.log("key", content)
    $.ajax({
        type: "GET",
        url: '/vote/index/search?content=' + content,
        success: function (item) {
            str = JSON.parse(item);
            console.log('str', str)
            if (str.errno === 0) {
                var html = "";
                var obj = str.data[0];
                console.log('obj', obj)
                if (obj) {
                    html += `
                    <div class="headpor">
                        <a href="javascript:"><img src="${obj.head_icon}"></a>
                    </div>
                    <div class="ticket">
                        <p>${obj.vote}票</p>
                        <div class="but">投TA一票</div>
                    </div>
                    <div class="name">
                        <a href="javascript:">
                            <span class="fef">${obj.username}</span>
                            <span class="thaa" style="margin: 0 6px;">|</span>
                            <span class="thaa taa">编号#${obj.id}</span>
                            <p>${obj.descrption}</p>
                        </a>
                    </div>
                    `;
                    $(".user").html(html);
                } else {
                    $(".user").css("display", "none");
                    $(".not").css("display", "block");
                }

                // 投票请求
                $(".but").click(function () {
                    //获取编号，被投票者id
                    var isId = $(".taa").html().split('#')[1];
                    console.log('isId',isId)
                    //获取本地存储的投票者id
                    var idpost = localStorage.getItem("id");
                    if (!idpost) {
                        alert('请先登录账号');
                        return;
                    }
                    console.log(123)
                    $.ajax({
                        type: 'GET',
                        url: '/vote/index/poll?id=' + isId + '&voterId=' + idpost,
                        success: function(data){
                            data = JSON.parse(data);
                            // 获取被投票者当前的票数
                            var isNum = Number($(".ticket p").html().split('')[0]);
                            if(data.errno === 0){
                                isNum = isNum + 1;
                                // alert(data.msg);
                                $(".ticket p").html(isNum + '票');
                                $(".ticket p").addClass("animated tada");
                            } else {
                                alert(data.msg);
                            }

                        },
                        // 返回数据：errno为0，数据正确	
                    });
                });

            }

        }
    });


});