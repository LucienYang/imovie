$(function(){
	$(".del").click(function(){
		var _this = this;
		layer.confirm('是否确认删除',function(){
			delFun()
		},function(index){
			layer.close(index)
		})
		var delFun = function(){
			var targetId = $(_this).attr('data-id')
			var targetTitle = $(_this).closest("tr").find("td").eq(1).text()
			$.ajax({
				type:'delete',
				url:'/admin/user',
				data:{id:targetId}
			})
			.done(function(data){
				if(data.success == 1){
					console.log(data)
					layer.alert(targetTitle+"删除成功", function(index){
						layer.close(index)
						window.location.reload()
					})
					$(_this).closest('tr').remove()
				}
			})
		}
	})
})

