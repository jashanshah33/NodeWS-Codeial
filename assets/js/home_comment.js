// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);

    let self = this;
    // call for all the existing comments
    $(" .comment_delete_link", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/createComment",
        data: $(self).serialize(),
        success: function (data) {
          let comment = data.data.comment;
          const newComment = pSelf.createcommmentDom(comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .comment_delete_link", newComment));

          new Noty({
            theme: "relax",
            text: "Comment published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  }

  createcommmentDom(comment) {
    return $(`<div  id="comment-${comment._id}"  class="diplayed_comment">
    <div class="left_container">

    <a href="/users/profile?id=${comment.user._id}">
      <h4>${comment.user.name}:</h4>
    </a>
  
    <p>${comment.comment}</p>
    </div>
    <div class="comment_delete_container">
    <div class="like_btn_container"><i class="fa-regular fa-heart"></i></div>

    <div class="comment_delete_btn_conatiner" id="comment-${comment._id}">
      <a class="comment_delete_link" href="/comments/destroy/?id=${comment._id}">
        <img
          width="100%"
          height="100%"
          src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
          alt=""
        />
      </a>
    </div>
    </div>
    </div>`);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log(data);
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  }
}
