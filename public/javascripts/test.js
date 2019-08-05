$(document).ready(function() {

	var pathname = location.pathname
	var total = 100 // 列表总数
	var flag = false
    /* 首页 */
    // 获取用户列表数据
    function getUserList(offset) {
        $.ajax({
            type: "get",
            url: "/vote/index/data?limit=10&offset=" + offset,
            data: "",
            success: function (response) {
                response = JSON.parse(response)
                console.log('response', response)
                if (response.errno === 0) {
                    var html = ''
					var objects = response.data.objects
					total = response.data.total
                    for(var i = 0; i < objects.length; i++) {
                        var user = objects[i]
                        html = html + 
                        `<div class="user">
                                <div class="headpor">
                                    <a href=""><img src="/images/boy.png"></a>
                                </div>
                                <div class="ticket">
                                    <p>${user.vote}票</p>
                                    <input type="button" value="投TA一票">
                                </div>
                                <div class="name">
                                    <a href="">
                                        <span class="fef">${user.username}</span>
                                        <span class="thaa" style="margin: 0 6px;">|</span>
                                        <span class="thaa">编号#${user.id}</span>
                                        <p>${user.descrption}</p>
                                    </a>
                                </div>
                            </div>`
                    }
					$('.list').append(html)
					flag = false
                } else {
                    alert('获取用户数据错了')
                }
            }
        });
    }

    // 首页初始化
    function homeInit() {
		var offset = 0
		var limit = 10
		getUserList(offset)
		$(window).scroll(function () {
			if ($(window).height() + $(window).scrollTop() === $(document).height()) {
				if (flag === false) {
					flag = true
					setTimeout(function() {
						offset = offset + limit
						if (offset > total) {
							$('.loading').html('全部加载完成～')
						} else {
							getUserList(offset)
						}
					}, 1000)
				}
			}
		});
    }


    /* 注册页 */

    // 注册用户
    function rigisterUser() {
        var username = $('input[name=userName]').val()
        var userPwd = $('input[name=userPwd]').val()
        var confirmPwd = $('input[name=confirmPwd]').val()
        var phone = $('input[name=phone]').val()
        var describe = $('input[name=describe]').val()
        var gender = $('input[name=sex]:checked').val()
        if (!username) {
            alert('请输入用户名')
            return false
        }
        if (!/^[a-zA-Z0-9]{1,10}$/.test(userPwd)) {
            alert('请输入正确密码')
            return false
        }
        if (!/^[a-zA-Z0-9]{1,10}$/.test(confirmPwd)) {
            alert('请输入正确确认密码')
            return false
        }
        if (userPwd !== confirmPwd) {
            alert('两次密码不一致')
            return false
        }
        if (!/^\d{11}$/.test(phone)) {
            alert('请输入正确的手机号码')
            return false
        }
        if (!describe) {
            alert('请输入描述')
            return false
        }
        $.ajax({
            type: "post",
            url: "/vote/register/data",
            data: {
                username: username,
                mobile: phone,
                descrption: describe,
                gender: gender === '0' ? 'boy' : 'girl',
                password: userPwd
            },
            success: function (response) {
                response = JSON.parse(response)
                if (response.errno === 0) {
                    alert(response.msg)
                    location.href = '/vote/index'
                    // window.open('/vote/index')
                } else {
                    alert('报名失败')
                }
            }
        });
        console.log('username', username, userPwd, confirmPwd, phone, describe, gender)
    }

    function registerInit() {
        $('.sub').click(function () { 
            rigisterUser()
        });
    }

    if (/index/.test(pathname)) {
        homeInit()
    } else if (/register/.test(pathname)){
        registerInit()
    }

})