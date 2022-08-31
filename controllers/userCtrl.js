const express = require('express')
const bcrypt = require("bcrypt")
const router = express.Router()
const User = require('../models/users.js')
const passport = require("passport")
const localStrategy = require("passport-local").Strategy


router.get("/register", (req,res) => {
    res.render("users/register.ejs", {
        user:req.session.currentUser,
        error: req.query.error
    })
})

router.post("/register", (req,res) => {
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    User.findOne({email:req.body.email}, (err,userExists) => {
        if(userExists) {
            res.redirect("/users/register?error=true")
        }else {
            User.create(req.body, (err,createUser) => {
                req.session.currentUser = createUser
                res.redirect("/find-wine")
            })
        }
    })
})

router.get("/signin",  (req,res) => {
    res.render("users/signin.ejs", {
        user:req.session.currentUser,
        error:req.query.error
    })
})

router.get("/success", (req,res) => {
    res.render("users/success.ejs", {
        user:req.session.currentUser,
        error:req.query.error
    })
})

router.post("/signin", (req,res) => {
    User.findOne({email: req.body.email}, (err,foundUser) => {
        if (foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if(validLogin) {
                req.session.currentUser = foundUser
                res.redirect("/users/success")
            }else {
                res.redirect("/users/signin?error=true")
            }
        }else {
            res.redirect("/users/signin?error=true")
        }
    })
})


router.get('/signout', (req, res) => {
    req.session.destroy()
    res.redirect('/find-wine')
})

module.exports = router