$(function(){
	$(".add").click(function(){
		alert(111)
		window.location = '/admin/movie'
	})
	$(".del").click(function(){
		var _this = this;
		var targetId = $(_this).attr('data-id')
		console.log(targetId)
		$.ajax({
			type:'delete',
			url:'/admin/movie',
			data:{id:targetId}
		})
		.done(function(data){
			if(data.success == 1){
				alert(targetId+"删除成功")
				$(_this).closest('tr').remove()
			}
		})
	})
})