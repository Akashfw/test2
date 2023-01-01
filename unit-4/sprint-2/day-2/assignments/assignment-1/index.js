const express=require("express");
const fs=require("fs");
const cors= require("cors");
const app=express();
app.use(express.json());
const multer= require("multer")
const uploads = multer({ dest: 'uploads/' });

app.post('/photo', uploads.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    let data= req.file;
    res.send(data)
  })




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.fieldname + '-' + `.jpg`)
    }
  })
  
  const upload = multer({ storage: storage })
  app.listen(3500,()=>{
    console.log("server running on 3500")
})