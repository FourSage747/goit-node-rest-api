const {Schema, model} = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
     email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: ""
    },
    avatarURL: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true })

userSchema.post("save", (error, data, next)=>{
    const {name, code} = error
    const status = (name === 'MongoServerError' && code === 11000) ? 409 : 400
    error.status = status
    next()
})

const User = model("user", userSchema)

module.exports = User;