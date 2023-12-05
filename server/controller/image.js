const mongoose = require("mongoose");
const grid = require("gridfs-stream");

const url = "http://localhost:8000";

let gfs, gridfsBucket;

const con = mongoose.connection;

con.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(con.db, {
    bucketName: 'fs'
  });
  gfs = grid(con.db, mongoose.mongo);
  gfs.collection('fs');
});


const uploadFile = async (request, response) => {
  // try {
  //   if (!request.file) {
  //     return response.status(404).json("file not found");
  //   }
  //   const imageUrl = `${url}/file/${request.file.filename}`;
  //   console.log("image url : ",imageUrl)
  //   response.status(200).json({message : "file uploaded : ",imageUrl});
  // } catch (error) {
  //   response.status(500).json({error: "error in upload file api", message :error.message})
  // }
  return response.status(200).json("image uploaded")
};


const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json("msg : ",error.message);
  }
};


module.exports = { uploadFile, getImage };
