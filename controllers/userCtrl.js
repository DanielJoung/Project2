const express = require('express');
const bcrypt = require("bcrypt")
const router = express.Router()
const User = require('../models/users.js');


router.get("/register", (req,res) => {
    res.render("users/register.ejs", {user:req.session.currentUser})
})

router.post("/register", (req,res) => {
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    User.findOne({email:req.body.email}, (err,userExists) => {
        console.log(req.body.email)
        if(userExists) {
            res.send("that email is taken")
        }else {
            User.create(req.body, (err,createUser) => {
                console.log(req.body)
                req.session.currentUser = createUser
                res.redirect("/users/signin")
            })
        }
    })
})

router.get("/signin", (req,res) => {
    res.render("users/signin.ejs", {user:req.session.currentUser})
})

router.post("/signin", (req,res) => {
    User.findOne({email: req.body.email}, (err,foundUser) => {
        if (foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if(validLogin) {
                req.session.currentUser = foundUser
                res.redirect("/find-wine")
            }else {
                res.send("Invalid email of password")
            }
        }else {
            res.send("Invalid email or password")
        }
    })
})

router.get('/signout', (req, res) => {
    req.session.destroy()
    res.redirect('/find-wine')
})

module.exports = router