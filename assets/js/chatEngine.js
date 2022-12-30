class chatEngine {
  constructor(chatBoxId, userEmail, userName) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.userName = userName;

    this.socket = io.connect("http://35.183.126.12:5000");

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      // console.log("Connection established !!!!!!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "socialBook",
      });

      self.socket.on("user_joined", function (data) {
        // console.log("A user joined", data);
      });
    });

    $("#send_message_form").submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/chat/create",
        data: $("#send_message_form").serialize(),
        success: function (data) {
          // console.log(data);

          let msg = $("#message_input").val();

          if (msg != "") {
            self.socket.emit("send_msg", {
              message: msg,
              user_email: self.userEmail,
              user_name: self.userName,
              chatroom: "socialBook",
            });

            $("#message_input").val("");
          }
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });

    self.socket.on("receive_message", function (data) {
      // console.log("message Received", data.message);
      let newMessage = $("<p>");

      let msgType = "other";

      if (data.user_email == self.userEmail) {
        msgType = "self";
      }

      newMessage.prepend(
        $("<sub>", {
          html: data.user_name,
        })
      );

      newMessage.append(
        $("<span>", {
          html: data.message,
        })
      );

      newMessage.addClass(msgType);

      $("#chat").append(newMessage);

      const chat = document.getElementById("chat");
      chat.scrollTop = chat.scrollHeight;
    });
  }
}

$("#chat_logo").click(function (e) {
  e.stopPropagation();
  $("#chat_box").css("display", "flex");

  const chat = document.getElementById("chat");
  chat.scrollTop = chat.scrollHeight;
});
$("#chat_box").click(function (e) {
  e.stopPropagation();
});
$(document).click(function () {
  $("#chat_box").css("display", "none");
});
