$(function(){
	$("#commentsBtn").click(function(){
		var commentsFromUser = $(this).siblings("h4").find("span").text();
		$('#commentsModal textarea').attr("placeholder","评论电影 : ");
		$('#commentsModal').modal('toggle')
	})

	$(".replyBtn").click(function(){
		var replyFromUser = $(this).siblings("h4").find("span").text();
		//$('#commentsModal input[name="comments[to]"]').val("{{ user.username }}");
		$('#commentsModal textarea').attr("placeholder","回复"+replyFromUser+" : ");
		$('#commentsModal').modal('toggle')
	})
})