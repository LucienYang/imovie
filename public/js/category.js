$(function(){
	$(".add").click(function(){
		layer.open({
		  type: 2,
		  title:'新增分类',
		  skin: 'layui-layer-rim', //加上边框
		  area: ['600px', '200px'], //宽高
		  content: '/admin/categtories/new'
		})
	})

	$('.add-submit').click(function(){
		var formData = $('.categoryForm').serializeArray();
		console.debug(formData)
		var categoryId = $('.categoryForm input[name="categories[_id]"]').val()
		var type = 'post'
		var url = '/admin/categtories'
		if(categoryId){
			type = 'put'
			url = '/admin/categtories/'+categoryId
		}
		$.ajax({
			type: type,
			url: url,
			data: formData
		})
		.done(function(data){
			if(data.success >= 1){
				var message = getAlertMessageByCode(data.success)
				parent.layer.alert(data.data.name+message, function(index){
					parent.layer.close(index)
					parent.window.location.reload()
				})
			}
		})

		var getAlertMessageByCode = function(code){
			switch(code){
				case 1:
					return "添加成功"
					break
				case 2:
					return "更新成功"
					break
				default:
					break
			}
		}
			
		return false
	})

	$('.add-cancle').click(function(){
		parent.layer.closeAll()
	})

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
				url:'/admin/categtories/'+targetId
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

	$(".update").click(function(){
		var categoryid = $(this).data('id')
		layer.open({
		  type: 2,
		  title:'更新电影',
		  skin: 'layui-layer-rim', //加上边框
		  area: ['600px', '200px'], //宽高
		  content: '/admin/categtories/'+categoryid
		})
	})
})

