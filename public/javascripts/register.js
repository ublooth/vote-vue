$(document).ready(function() {
        var reg = /^[0-9A-Za-z]{1,10}$/;//数字或字母
        var phones = /^1(3|4|5|7|8)\d{9}$/;//手机号码
        $('#userPwd').blur(function () {
            var pass = $('#userPwd').val();//密码
            if (reg.test(pass) == false) {
                alert("密码必须为数字或字母且不超过10个长度");
                return false;
            }
        })    
        $('#userPwd2').blur(function () {
            var pass = $('#userPwd').val();//密码
            var passTwo = $('#userPwd2').val();//确认密码
            if (pass != passTwo) {
                alert("两次密码不一致");
                return false;
            }
        });
        $('#phone').blur(function () {
            var ph = $('#phone').val();//手机号码
            if (phones.test(ph) == false) {
                alert("手机号码格式错误");
                return false;
            }
        }); 

         
        $('.sub').click(function(e){
            e.preventDefault();
            var sex = $("input[name='sex']:checked").val();//性别
            var user = $('#userName').val();//用户名
            var pass = $('#userPwd').val();//密码
            var passTwo = $('#userPwd2').val();//确认密码
            var ph = $('#phone').val();//手机号码
            var desc = String($("#describe").val());//描述
            if(user == ''){
                alert("用户名不能为空！");
                return false;
            }
            
            if(pass == ''){
                alert("密码不能为空！");
                return false;
            }
            if (reg.test(pass) == false) {
                alert("密码必须为数字或字母且不超过10个长度");
                return false;
            }

            if(passTwo == ""){
                alert("请输入确认密码！");
                return false;
            }
            if (pass != passTwo) {
                alert("两次密码不一致");
                return false;
            }

            if(ph == ""){
                alert("请输入正确格式的手机号码！");
                return false;
            }
            if (phones.test(ph) == false) {
                alert("手机号码格式错误");
                return false;
            }

            if(desc == ""){
                alert("请填写自我描述（20字以内）");
                return false;
            }
            
            $.ajax({
                type:"post",
                url: "/vote/register/data",
                data: {
                    username: user,
                    mobile: ph,
                    descrption: desc,
                    gender: sex === '0' ? 'boy' : 'girl',
                    password: pass
                },//规定要发送到服务器的数据
                success:function(response) {
                    response = JSON.parse(response);
                    console.log('response',response)
                    var pass = $('#userPwd').val();//密码
                    console.log('user',pass)
                    if (response.errno === 0) {
                        localStorage.setItem("id",response.id);//用户编号
                        localStorage.setItem("pwd",pass);//密码
                        alert(response.msg);
                        location.href = '/vote/index';
                        // window.open('/vote/index');
                    }else{
                        alert('报名失败');
                    }
                }
            });
        });

});
