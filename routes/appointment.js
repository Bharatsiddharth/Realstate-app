var express = require("express");
var router = express.Router();
const { isLoggedIn } = require("../utils/auth");
const AppointmentSchema = require("../models/appointmentSchema");

function verifyrole(req, res, next) {
    if (req.user.role == "buyer") {
        next();
    } else {
        res.send("Only buyer have the permission to get appointment property <a href='/user/profile'>Profile</a>");
    }
}

router.get("/:propertyid", isLoggedIn,verifyrole, function(req,res,next){
    res.render("appointment", {
        user:req.user,
        pid:req.params.propertyid,
    })
})

router.post(
    "/:propertyid",
    isLoggedIn,
    verifyrole,
    async function (req, res, next) {
        try {
            const newappointment = new AppointmentSchema({
                ...req.body,
                user: req.user._id,
                property: req.params.propertyid,
            });
            await newappointment.save();
            // res.send("appointment scheduled")
            res.redirect("/user/profile");
        } catch (error) {
            res.send(error.message);
        }
    }
);

module.exports = router;