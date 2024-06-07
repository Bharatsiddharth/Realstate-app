exports.isLoggedIn = (req,res ,next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        req.send("log in is required")
    }
}