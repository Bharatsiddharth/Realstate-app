var express = require('express');
var router = express.Router();

const { isLoggedIn } = require("../utils/auth");

const PropertySchema = require("../models/propertySchema")

const upload = require("../utils/multer");



function verifyrole(req,res,next){
    if(req.user.role == "seller"){
        next();
    }else{
        res.send("only seller hav permission to create property")
    }
}



router.post('/', isLoggedIn,verifyrole, upload.single("image"),async function(req, res, next) {
  try {
    const newProperty = new PropertySchema({
        ...req.body,
        image: req.file.filename,
        owner:req.user._id,
    })
    await newProperty.save();
    res.send("property created!")
  } catch (error) {
    res.send(error.message);
  }
});




module.exports = router;
