const multer = require("multer")
const gridfsStorage = require("multer-gridfs-storage")

const storage = new gridfsStorage.GridFsStorage({
    url :`mongodb+srv://destro:aT6XBJqfaN2XoFum@cluster0.7nytowa.mongodb.net/user?retryWrites=true&w=majority` ,
    options:{ useNewUrlParser: true , useUnifiedTopology: true},

    file:(request, file)=>{
        const match = ["image/jpg", "image/png"]

        if (match.indexOf(file.mimetype)=== -1){
            return`${Date.now()}-blog-${file.originalname}`;
        }
        return {
            filename : `${Date.now()}-blog-${file.originalname}`
        }
    }

})

const upload = multer({storage})

module.exports = upload
