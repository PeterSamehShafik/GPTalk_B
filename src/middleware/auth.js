import jwt from 'jsonwebtoken'
import userModel from '../../DB/models/user.model.js';
import { asyncHandler } from './asyncHandler.js';
import { checkUser } from './../services/checkUser.js';


const auth = () => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers
        if (authorization?.startsWith(process.env.BEARERKEY)) {
            const decoded = jwt.verify(authorization.split(process.env.BEARERKEY)[1], process.env.SIGNINKEY)
            if (decoded?.id) {
                const user = await userModel.findOne({ _id: decoded.id }).select("userName isBlocked confirmEmail isDeleted")
                if (user) {
                    const { err, cause } = checkUser(user, ['isDeleted', 'isBlocked', 'confirmEmail'])
                    if (!err) {
                        req.user = { _id: user._id, userName: user.userName }
                        next()
                    } else {
                        return next(Error(" the current signed User :" + err, { cause }))
                    }


                } else {
                    return next(Error("This user was deleted or blocked or not confirmed yet, please contact the administrator", { cause: 401 }))

                }
            } else {
                return next(Error("authorization error (payload)", { cause: 401 }))

            }
        } else {
            // res.status(401).json({ message: "authorization error (bearerKey)" })
            return next(Error("authorization error (bearerKey)", { cause: 401 }))

        }

    }
    )
}

export default auth
