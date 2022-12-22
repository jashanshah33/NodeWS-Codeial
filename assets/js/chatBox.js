$("#chat_logo").click(function (e) {
  e.stopPropagation();
  $("#chat_box").css("display", "flex");
});
$("#chat_box").click(function (e) {
  e.stopPropagation();
});
$(document).click(function () {
  $("#chat_box").css("display", "none");
});
