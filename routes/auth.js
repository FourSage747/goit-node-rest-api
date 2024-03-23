const express = require("express")
const authenticate = require("../helpers/authenticate.js")
const upload = require("../helpers/upload.js")
const {
    register,
    login,
    getCurrent,
    logout,
    updateAvatar
} = require("../controllers/authControllers")

const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.get("/current", authenticate, getCurrent)

router.post("/logout", authenticate, logout)

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar)

module.exports = router