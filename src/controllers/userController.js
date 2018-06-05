const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {

  signUp(req, res, next){
    res.render("users/sign_up");
  },

  create(req, res, next){
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        console.log(err);
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        })
      }
    });
  },

  signInForm(req, res, next){
    res.render("users/sign_in");
  },

  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if (!res) { return next(err); }
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    });
  },

//  signIn(req, res, next){
//    passport.authenticate("local", (err, user, info) => {
//      if (err) { return next(err); }
//      if(!user){
//        console.log("userController1 "+ info);
//        console.log("userController2 "+ user);
//        console.log("userController3 "+ err);
//        req.flash("notice", "Sign in failed. Please try again.");
//        res.redirect("/users/sign_in");
//      } else {
//        console.log("userController5 "+ req.user);
//        req.flash("notice", "You've successfully signed in!");
//        res.redirect("/");
//      }
//    })(req, res, next);;
//  },

  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }

}
