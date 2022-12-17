const resetForm = document.querySelector("#change_password_form");
console.log(window.location.search.slice(1));
const token = window.location.search.slice(1);
resetForm.action = `/users/changePassword?accessToken=${token}`;
