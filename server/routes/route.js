const express = require("express")
const {addUser, getUser} = require("../controller/user.js")
const {newConversation, getConversation}  = require("../controller/conversation.js")
const { newMessage, getMessage } = require("../controller/message.js")
const { uploadFile, getImage } = require("../controller/image.js")
const upload = require("../utils/upload.js")

const route = express.Router()

route.post('/add', addUser)
route.get('/users', getUser)

//conversation
route.post('/conversation/c-add', newConversation)
route.post('/conversation/c-get', getConversation)

//messags
route.post('/message/m-new', newMessage)
route.get('/message/m-get/:id', getMessage)

//documents
// route.post('/file/upload', upload.single("file"), uploadFile)
route.post('/file/upload', upload.single("file"), async(req, res) => {
    try {
         await uploadFile(request, response);
    } catch (error) {
        console.log("Error in file upload:", error.message);
        response.status(500).json({ error: "Internal server error", message: error.message });
    }
});
route.get('/file/:filename', getImage )

module.exports = route