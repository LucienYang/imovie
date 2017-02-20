$(function(){
	//注册事件
	$(".registerBtn").click(function(){
		var _this = this
		var formData = $('.registerForm').serializeArray();
		$.ajax({
			type:'post',
			url: '/user/register',
			data: formData
		})
		.done(function(data){
			console.log('---------done-----------')
			console.log(data)
			console.log('----------done----------')
			if(data.success >= 1){
				layer.confirm(data.data.username+'注册成功！<br>是否直接登录？', function(index){
					 window.location = '/user/loginPage'
				},function(index){
					layer.close(index)
				})
			}else{
				layer.alert("注册失败！<br>失败原因： "+data.data)
			}
		})
		.fail(function(data){
			console.log('----------fail----------')
			console.log(data)
			console.log('----------fail----------')
		})
		return false
	})
	//登录事件
	$('.loginBtn').click(function(){
		var _this = this
		var formData = $('.loginForm').serializeArray()
		$.ajax({
			type:'post',
			url: '/login',
			data: formData
		})
		.done(function(data){
			if(data.success >= 1){
				window.location = '/'
			}else{
				layer.alert("登录失败！<br>失败原因： "+data.data)
			}
		})
		return false
	})
})