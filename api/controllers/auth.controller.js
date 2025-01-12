import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, "you are not allowed to create this user"));
    };
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be at least 6 characters"));
        }
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, "Username mast be between 7 and 20 characters"));
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username cannot contain spaces"));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be lowercase"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
                errorHandler(400, 'Username can only contain letters and numbers')
            );
        }
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