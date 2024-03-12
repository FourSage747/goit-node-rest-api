const express = require("express")
const authenticate = require("../helpers/authenticate.js")

const {
    register,
    login,
    getCurrent,
    logout
} = require("../controllers/authControllers")

const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.get("/current", authenticate, getCurrent)

router.post("/logout", authenticate, logout)

module.exports = router