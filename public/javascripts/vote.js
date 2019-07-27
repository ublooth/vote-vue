


$(document).ready(function() {

    function getUserList() {
        $.ajax({
            type: "get",
            url: "/vote/index/data?limit=10&offset=0",
            data: "",
            success: function (response) {
                response = JSON.parse(response)
                if (response.errno === 0) {
                    var html = ''
                    var objects = response.data.objects
                    for(var i = 0; i < objects.length; i++) {
                        var user = objects[i]
                        console.log(user)
                        html = html + 
                        `<div class="user">
                                <div class="headpor">
                                    <a href=""><img src="/images/boy.png"></a>
                                </div>
                                <div class="ticket">
                                    <p>5票</p>
                                    <input type="button" value="投TA一票">
                                </div>
                                <div class="name">
                                    <a href="">
                                        <span class="fef">${user.username}</span>
                                        <span class="thaa" style="margin: 0 6px;">|</span>
                                        <span class="thaa">编号#8</span>
                                        <p>hellohellohellohellohellohellohellohellohellohellohellohellohello</p>
                                    </a>
                                </div>
                            </div>`
                    }
                    $('.list').html(html)
                } else {
                    alert('获取用户数据错了')
                }
                console.log('response', response)
            }
        });
    }


    getUserList()

})