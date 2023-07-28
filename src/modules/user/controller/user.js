import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { findByIdAndUpdate, findById, updateOne, find, findOne, findOneAndUpdate } from './../../../../DB/DBmethods.js';
import CryptoJS from "crypto-js";
import bcrypt from 'bcryptjs'
import { checkUser } from "../../../services/checkUser.js";


export const privateData = '-isDeleted -confirmEmail -isBlocked -password -code ';

export const getProfile = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        let user;
        //anotherUser
        if (id) {
            user = await findById({
                model: userModel, filter: { _id: id }, select: privateData + '-wishList',
            })
        } else {    //ownProfile
            user = await findById({
                model: userModel, filter: { _id: req.user._id }, select: privateData,
            })
        }

        let result = JSON.stringify(user);
        result = JSON.parse(result);

        return res.status(200).json({ message: "done", user:result })
    }
)

export const signOut = asyncHandler(
    async (req, res, next) => {
        let date = new Date()
        const result = await findOneAndUpdate({ model: userModel, filter: { _id: req.user._id }, data: { lastSeen: date, isOnline: false }, options: { new: true } });
        return res.status(200).json({ message: "done" });
    }
)
