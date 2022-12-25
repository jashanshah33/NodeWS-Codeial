const Chat = require('../models/chat')

module.exports.createChat = async function(req, res){
    if (req.user) {
      let newMessage = await Chat.create({
            user:req.user._id,
            content: req.body.message
        })

      newMessage = await newMessage.populate("user", "email, name")


        return res.status(200).json({
            message: "Request Successfull!",
            data: {
                newMessage: newMessage,
            },
          });
    }
}