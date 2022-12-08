{
  const createComment = function () {
    let newCommentForm = $("#add_comment_form");

    newCommentForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/comments/createComment",
        data: newCommentForm.serialize(),
        success: function (data) {
          let comment = data.data.comment;
          console.log(comment);

          const newComment = createNewComment(comment);
          $("#Comments_outer_container").prepend(newComment);
          deletePost($(" .comment_delete_link", newComment));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  const createNewComment = function (comment) {
    return $(`<div  id="comment-${comment._id}"  class="diplayed_comment">
    <a href="/users/profile?id=${comment.user._id}">
      <h4>${comment.user.name}:</h4>
    </a>
  
    <p>${comment.comment}</p>

    <div class="comment_delete_container">
      <a class="comment_delete_link" href="/comments/destroy?id=${comment._id}">
        <img
          width="100%"
          height="100%"
          src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
          alt=""
        />
      </a>
    </div>

    </div>`);
  };

  const deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      console.log("workong");

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log(data);
          $(`#comment-${data.data.comment_id}`).remove();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  createComment();
}
