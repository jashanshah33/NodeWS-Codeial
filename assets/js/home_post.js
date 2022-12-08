{
  let createPost = function () {
    let newPostForm = $("#addPost_form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          const post = data.data.post;
          // console.log("data", post);
          let newPost = createNewPost(post);

          $("#post_list_container").prepend(newPost);
          new Noty({
            theme: "relax",
            text: "Post Created!",
            type: "success",
            layout: "topRight",
            timeout: 2500,
          }).show();

          deletePost($(" .Post_delete_btn_link", newPost));
          // call the create comment class
          //new PostComments(data.data.post._id);
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  let createNewPost = function (post) {
    return $(`<div id="post-${post._id}" class="single_post_container">
      <a href="/users/profile?id=${post._id}">
        <h4>${post.user.name}</h4>
      </a>

      <div class="Post_delete_btn">
        <a class="Post_delete_btn_link" href="/posts/destroy?id=${post._id}">
          <img
            width="100%"
            height="100%"
            src="https://cdn-icons-png.flaticon.com/512/484/484611.png"
            alt=""
          />
        </a>
      </div>

      <hr />
      <p>${post.content}</p>
      <hr />
      <div class="post_img_container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
          alt=""
          width="100%"
          height="100%"
        />
        <p>10</p>
        <img
          class="comment_icon"
          src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
          alt=""
          width="100%"
          height="100%"
        />
        <p>${post.comments.length}</p>
      </div>
      <div class="comment_form_container">
        <form action="/comments/createComment" method="post">
          <input name="comment" width="100%" type="text" required />
          <input name="post" value="${post._id}" type="hidden" required />

          <button type="submit">Add</button>
        </form>
      </div>

      <hr />
      <h3 class="comments_header">Comments:-</h3>

      <div class="Comments_outer_container">
      <div id="post-comments-${post._id}">

    </div>
    </div>

    </div>`);
  };

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted!",
            type: "success",
            layout: "topRight",
            timeout: 2500,
          }).show();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  let convertPostsToAjax = function () {
    $("#post_list_container>div").each(function () {
      let self = $(this);
      console.log(self);
      let deleteButton = ($(" .Post_delete_btn_link", self));

      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      // let postId = self.prop('id').split("-")[1]
      // new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}
