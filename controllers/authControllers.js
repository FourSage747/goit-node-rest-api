const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const {SECRET_KEY} = process.env

const HttpError = require("../helpers/HttpError")
const {
    registerSchema,
    loginSchema,
} = require("../schemas/authSchemas")

const register = async(req, res, next) => {
    try {
        const {error} = registerSchema.validate(req.body)
        const {email, password} = req.body
        if(error){
            throw HttpError(400, error.message)
        }
        const user = await User.findOne({email})
        if(user){
            throw HttpError(409, "Email in use")
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({...req.body, password: hashPassword})
        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            }
        })
    }
    catch(error) {
        next(error)
    }
}

const login = async(req, res, next) => {
    try {
        const {error} = loginSchema.validate(req.body)
        const {email, password} = req.body
        if(error){
            throw HttpError(400, error.message)
        }
        const user = await User.findOne({email})
        if(!user){
            throw HttpError(401, "Email or password is wrong")
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            throw HttpError(401, "Email or password is wrong")
        }
        
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
        await User.findByIdAndUpdate(user._id, {token})
        // const {id} = jwt.decode(token)
        // console.log(id)
        res.json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
    }
    catch(error) {
        next(error)
    }
}

const getCurrent = async(req, res, next) => {
    try {
        const {email, subscription} = req.user
        res.json({
            email,
            subscription
        })
    }
    catch(error) {
        next(error)
    }
}

const logout = async(req, res, next) => {
    try {
        const {_id} = req.user
        await User.findByIdAndUpdate(_id, {token: ""})
        res.status(204).json()
    }
    catch(error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
    getCurrent,
    logout
}