import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json({ message: "API is working!" });
}

export const getUsers = async (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed get User"))
    }
    try {
        const users = await User.find().sort({isAdmin: -1});

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        })

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
        })
    } catch (error) {
        next(error);
    }

}

export const updateUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, "you are not allowed to update this user"));
    };
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be at least 6 characters"));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
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
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            }, {new: true}
        )

        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }

}

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, "you are not allowed to delete this user"));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been delete");
    } catch (error) {
        next(error);
    }

}

export const signout = async (req, res, next) => {
    try {
        res
            .clearCookie("access_token")
            .status(200)
            .json("signout success!")
    } catch (error) {
        next(error);
    }
}