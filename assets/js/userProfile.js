const editBtn = document.querySelector("#profile_edit_btn");
const editForm = document.querySelector("#profile_edit_form");
let button = true;
const avatorInput = document.querySelector("#avator");
const submitPreview = document.querySelector("#preview_img_submit");

if (editBtn) {
  editBtn.addEventListener("click", function () {
    editBtn.style.display = "none";
    editForm.style.display = "flex";
  });
}

avatorInput.addEventListener("change", function (event) {
  if (event.target.files.length > 0) {
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview_img");
    preview.src = src;
    document.querySelector("#preview_container").style.display = "flex";
  }
});

submitPreview.addEventListener("click", function () {
  document.querySelector("#preview_container").style.display = "none";
});

// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleFriend {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.togglefriends();
  }

  togglefriends() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;

      // this is a new way of writing ajax which you might've studied, it looks like the same as promises
      $.ajax({
        type: "POST",
        url: $(self).attr("href"),
      })

        .done(function (data) {
          if (data.data.friendRemoved == true) {
            $(self).attr("data-friend", "false");
            new Noty({
              theme: "relax",
              text: "Friend Removed!",
              type: "success",
              layout: "topRight",
              timeout: 2500,
            }).show();
            $(".toggle-friend-button>button")[0].innerText = "Add Friend";
          } else {
            $(self).attr("data-friend", "true");
            new Noty({
              theme: "relax",
              text: "Friend Added!",
              type: "success",
              layout: "topRight",
              timeout: 2500,
            }).show();

            $(".toggle-friend-button>button")[0].innerText = "Remove Friend";
          }

          console.log("********", $(self).attr("data-friend"));

          // let likesCount = parseInt($(self).attr("data-likes"));
          // if (data.data.deleted == true) {
          //   likesCount -= 1;
          //   // $(self.children[0])[0].style.color = "black";
          // } else {
          //   likesCount += 1;
          //   // $(self.children[0])[0].style.color = "red";
          // }

          // $(self).attr("data-likes", likesCount);
          // $(self.children[1]).html(likesCount);
        })
        .fail(function (errData) {
          console.log("error in completing the request");
        });
    });
  }
}

console.log($(".toggle-friend-button").attr("data-friend"));
