const express = require('express');
const bcrypt = require("bcrypt")
const router = express.Router()
const User = require('../models/users.js')

router.get("/register", (req,res) => {
    res.render("users/register.ejs")
})

router.post("/register", (req,res) => {
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    User.findOne({userName:req.body.userName}, (err,userExists) => {
        if(userExists) {
            res.send("that username is taken")
        }else {
            User.create(req.body, (err,createUser) => {
                req.session.createUser = createUser
                res.redirect("/find-wine")
            })
        }
    })
})

router.get("/signin", (req,res) => {
    res.render("users/signin.ejs")
})

router.post("/signin", (req,res) => {
    User.findOne({userName:req.body.userName}, (err,foundUser) => {
        if(foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if (validLogin) {
                req.session.createUser = foundUser
                res.redirect("/find-wine")
            } else {
                res.send("Invalid username or password")
            }
        }else {
            res.send("Invalid username or password")
        }
    })
})

router.get('/signout', (req, res) => {
    // this destroy's the session
    req.session.destroy()
    res.redirect('/find-wine')
  })

module.exports = router