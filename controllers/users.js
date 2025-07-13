const User = require("../models/user");
//render signup form
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

//sign up 
module.exports.signup = async(req, res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            };
        req.flash("success","welcome to Wanderlust")
        res.redirect("/listings");
    });
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup");
    }
    
};

//render login form
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
};

//login
module.exports.login = async(req,res)=>{
     req.flash("success","Welcome back to Wanderlust");
     let redirectUrl = res.locals.redirectUrl || "/listings"
     res.redirect(redirectUrl);
};

//logout
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        };
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
};