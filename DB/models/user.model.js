import { Schema, model, Types } from 'mongoose'


const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "userName is required"],
        min: [3, "Length of userName must be more than 3"],
        max: [20, "Length of userName must be more than 20"],
        unique: [true, 'userName should be unique']
    },
    email: {
        type: String,
        required: [true, "email is required"],
        min: [5, "Length of email must be more than 5"],
        max: [50, "Length of email must be more than 50"],
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: [true, "password is required"],
        min: [8, "Length of password must be more than 8"],
        max: [20, "Length of password must be more than 20"]
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        default: null
    },
    pinned: [{ type: Schema.Types.ObjectId, ref: 'User' }],


}, {
    timestamps: true
})


const userModel = model('User', userSchema)

export default userModel