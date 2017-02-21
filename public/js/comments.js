$(function(){
	$("#commentsBtn").click(function(){
		var commentsFromUser = $(this).siblings("h4").find("span").text();
		$('#commentsModal textarea').attr("placeholder","评论电影 : ");
		$('#commentsModal').modal('toggle')
	})

	$(".replyBtn").click(function(){
		var replyToUser = $(this).siblings("h4").find("span").text();
		var fromId = $(this).data("fromid");
		var toId = $(this).data("toid");
		var commentId = $(this).data("commentid");
		if(fromId === toId){
			layer.alert("不能自己给自己回复", function(index){
				layer.close(index)
			});
			return false
		}
		$("<input>").attr({
			type: 'hidden',
			name: 'comments[fromId]',
			value: fromId
		}).appendTo("#commentsForm");

		$("<input>").attr({
			type: 'hidden',
			name: 'comments[toId]',
			value: toId
		}).appendTo("#commentsForm");

		$("<input>").attr({
			type: 'hidden',
			name: 'comments[commentId]',
			value: commentId
		}).appendTo("#commentsForm");
		//$('#commentsModal input[name="comments[to]"]').val("{{ user.username }}");
		$('#commentsModal textarea').attr("placeholder","回复"+replyToUser+" : ");
		$('#commentsModal').modal('toggle');
	})
})