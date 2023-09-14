import passport from 'passport';
import {Strategy, ExtractJwt} from "passport-jwt";
import User from "../models/User.js"

export default passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TOKEN
}, async(payload, done)=>{
    try {
        let user = await User.findById({_id: payload.id},
            "-password -createdAt -updatedAt -__v");
        if (!user) return done(null, false);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));