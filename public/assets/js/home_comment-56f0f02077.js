class PostComments{constructor(e){this.postId=e,this.postContainer=$("#post-"+e),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(" .comment_delete_link",this.postContainer).each(function(){t.deleteComment($(this))})}createComment(o){let n=this;this.newCommentForm.submit(function(e){e.preventDefault();$.ajax({type:"post",url:"/comments/createComment",data:$(this).serialize(),success:function(e){var t=e.data.comment,t=n.createcommmentDom(t);$("#post-comments-"+o).prepend(t),n.deleteComment($(" .comment_delete_link",t)),new ToggleLike($(" .toggle-like-button",t)),$(`#post-${o}-comments-form>input`).val(""),$("#comments-length-"+o).html(e.data.allComments.length),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})}createcommmentDom(e){return $(`<div  id="comment-${e._id}"  class="diplayed_comment">
    <div class="left_container">

    <a href="/users/profile?id=${e.user._id}">
      <h4>${e.user.name}:</h4>
    </a>
  
    <p>${e.comment}</p>
    </div>
    <div class="comment_delete_container">
    <div class="like_btn_container">
    <a
      class="toggle-like-button"
      data-likes=${e.likes.length}
      href="/likes/toggle?id=${e._id}&type=Comment"
    >
      <i id="Comment-${e._id}" class="fa-regular fa-heart"></i>

      <span style="margin: 0 10px 0 -8px">${e.likes.length}</span>
    </a>
  </div>
    <div class="comment_delete_btn_conatiner" id="comment-${e._id}">
      <a class="comment_delete_link" href="/comments/destroy/?id=${e._id}">
        <img
          width="100%"
          height="100%"
          src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
          alt=""
        />
      </a>
    </div>
    </div>
    </div>`)}deleteComment(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){$("#comment-"+e.data.comment_id).remove(),$("#comments-length-"+e.data.postId).html(e.data.allComments.length),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})}}