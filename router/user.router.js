import  express from "express";
import userController from "../controllers/user.controller.js";
import {validate} from "../middleware/validator.js";
import { userSignUp } from "../schema/user.schema.js";

const router = express.Router();

router.post('/signup', validate(userSignUp), userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

export default router;