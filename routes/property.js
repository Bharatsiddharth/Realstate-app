var express = require('express');
var router = express.Router();

const { isLoggedIn } = require("../utils/auth");

const PropertySchema = require("../models/propertySchema")

const upload = require("../utils/multer");


router.get("/", isLoggedIn, function (req, res, next) {
    res.render("createproperty" ,{user:req.user});
});


function verifyrole(req,res,next){
    if(req.user.role == "seller" || req.user.role == "agent"){
        next();
    }else{
        res.send("only seller/agent have permission to create property")
    }
}




router.post(
    "/",
    isLoggedIn,
    verifyrole,
    upload.single("image"),
    async function (req, res, next) {
        try {
            const newproperty = new PropertySchema({
                ...req.body,
                image: req.file.filename,
                owner: req.user._id,
            });
            await newproperty.save();
            // res.send("Property Created!"); 
            res.redirect("/user")
        } catch (error) {
            res.send(error.message);
        }
    }
);




module.exports = router;
