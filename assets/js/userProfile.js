const editBtn = document.querySelector("#profile_edit_btn");
const editForm = document.querySelector("#profile_edit_form");
let button = true;

if (editBtn) {
  editBtn.addEventListener("click", function () {
    editBtn.style.display = "none";
    editForm.style.display= 'flex'
    
  });
}

