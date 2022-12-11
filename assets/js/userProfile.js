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
