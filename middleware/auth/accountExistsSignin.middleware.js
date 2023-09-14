import User from "../../models/User.js"

export const accountExistsSignin = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(user) {
        req.user = user

        return next()
    }

    return res.status(400).json({
        success: false,
        message: 'User not registered.'
    }
    )
}