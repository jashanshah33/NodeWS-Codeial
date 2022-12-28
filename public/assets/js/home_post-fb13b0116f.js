{let t=function(){let e=$("#addPost_form");e.submit(function(t){t.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:e.serialize(),success:function(t){var e=t.data.post,e=o(e);$("#post_textarea").val(""),$("#post_list_container").prepend(e),new Noty({theme:"relax",text:"Post Created!",type:"success",layout:"topRight",timeout:2500}).show(),s($(" .Post_delete_btn_link",e)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",e))},error:function(t){console.log(t.responseText)}})})},o=function(t){return $(`<div class="single_post_container" id="post-${t._id}" >
      <a href="/users/profile?id=${t._id}">
        <h4>${t.user.name}</h4>
      </a>

      <div class="Post_delete_btn">
        <a class="Post_delete_btn_link" href="/posts/destroy?id=${t._id}">
          <img
            width="100%"
            height="100%"
            src="https://cdn-icons-png.flaticon.com/512/484/484611.png"
            alt=""
          />
        </a>
      </div>

      <hr />
      <p>${t.content}</p>
      <hr />
      <div class="post_img_container">

      <div class="like_btn_container">
      <a class="toggle-like-button" data-likes="${t.likes.length}" id="${t._id}" href="/likes/toggle?id=${t._id}&type=Post"
        ><i class="fa-regular fa-heart"></i>
        <p>${t.likes.length}</p>
      </a>
    </div>
  
        <img
          class="comment_icon"
          src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
          alt=""
          width="100%"
          height="100%"
        />
        <p>${t.comments.length}</p>
      </div>
      <div class="comment_form_container">
        <form id='post-${t._id}-comments-form' action="/comments/createComment" method="post">
          <input name="comment" width="100%" type="text" required />
          <input name="post" value="${t._id}" type="hidden" required />

          <button type="submit">Add</button>
        </form>
      </div>

      <hr />
      <h3 class="comments_header">Comments:-</h3>

      <div class="Comments_outer_container">
      <div id="post-comments-${t._id}">

    </div>
    </div>

    </div>`)},s=function(e){$(e).click(function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",text:"Post Deleted!",type:"success",layout:"topRight",timeout:2500}).show()},error:function(t){console.log(t.responseText)}})})},e=function(){$("#post_list_container>div").each(function(){var t=$(this),e=$(" .Post_delete_btn_link",t),e=(s(e),t.prop("id").split("-")[1]);new PostComments(e)})};t(),e()}