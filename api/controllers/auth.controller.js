import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {

    if (!req.user || !req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to signup"))
    }

    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
    ) {
        next(errorHandler(404, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(200).json("Singup successful");
    } catch (error) {
        next(error);
    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(errorHandler(400, "All fields are required"))
    }

    try {
        const valideUser = await User.findOne({ email });

        if (!valideUser) {
            return next(errorHandler(400, "User not found"))
        }
        const validePassword = bcryptjs.compareSync(password, valideUser.password);
        if (!validePassword) {
            return next(errorHandler(400, "Invalid password"));
        }
        const token = jwt.sign(
            { id: valideUser._id, isAdmin: valideUser.isAdmin },
            process.env.JWT_SECRET_TOKEN
        );

        const { password: pass, ...rest } = valideUser._doc;

        res.status(200).cookie("access_token", token, {
            httpOnly: true,
        }).json(rest);

    } catch (error) {
        next(error);
    }
}