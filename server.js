const express = require("express")
const app = express()
const Wine = require("./models/wines.js")
const User = require("./models/users")
const methodOverride = require("method-override")
const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
require("dotenv").config()
const PORT = process.env.PORT 
const mongoURI = process.env.MONGODB_URI
const SESSION_SECRET = process.env.SESSION_SECRET


// Mongoose
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

// Passport.js
app.use(passport.initialize())
app.use(passport.session())


const wineController = require("./controllers/wineCtrl.js")
app.use("/find-wine", wineController)
const userController = require("./controllers/userCtrl.js")
app.use("/users", userController)

// Default
app.get("/", (req,res) => {
    res.render("home.ejs", {user: req.session.currentUser})
})


// listen
app.listen(PORT, () => {
    console.log("This server is running: ",PORT)
})