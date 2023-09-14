import User from "../models/User.js";

const controller = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();

      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);

      return res.status(200).json({
        success: true,
        message: "User created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error creating user",
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: () => {},
};

export default controller;
