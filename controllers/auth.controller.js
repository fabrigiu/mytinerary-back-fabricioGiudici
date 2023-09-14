import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verify } from "../helpers/google-verify.js";

const authController = {
  signup: async (req, res, next) => {
    try {
      req.body.verified_code = crypto.randomBytes(10).toString("hex");
      req.body.password = bcryptjs.hashSync(req.body.password, 10);

      const user = await User.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Signed up",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to sign up",
      });
    }
  },
  signin: async (req, res, next) => {
    try {
      let user = await User.findOneAndUpdate(
        { email: req.user.email },
        { online: true },
        { new: true }
      );

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          userName: user.userName,
          image: user.image,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "10h" }
      );

      user.password = null;

      return res.status(200).json({
        success: true,
        message: "Logged in",
        response: {
          token,
          user: {
            userName: user.userName,
            email: user.email,
            image: user.image,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Auth error",
      });
    }
  },

  signout: async (req, res, next) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { online: false },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Logged out",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Auth error",
      });
    }
  },
  token: async (req, res, next) => {
    const { user } = req;
    try {
      return res.status(200).json({
        user: {
          userName: user.userName,
          email: user.email,
          image: user.image,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  googleSignin: async (req, res, next) => {
    const { token_id } = req.body;

    try {
      const { userName, email, image } = await verify(token_id);

      let user = await User.findOne({ email });
      if (!user) {
        const data = {
          userName,
          email,
          image,
          password: bcryptjs.hashSync(process.env.GOOGLE_CLIENT_ID, 10),
          google: true,
          verified_code: crypto.randomBytes(10).toString("hex"),
        };
        console.log(data);
        user = await User.create(data);
      }

      user.online = true;
      await user.save();

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          userName: user.userName,
          image: user.image,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "10h" }
      );

      res.status(200).json({
        success: true,
        message: "Google user logged in",
        response: {
          token,
          user: {
            userName: user.userName,
            email: user.email,
            image: user.image,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Auth error",
        error: error.message,
      });
    }
  },
};

export default authController;
