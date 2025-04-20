import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./users/user-controller.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { authRouter } from "./auth/auth-controller.js";
import cookieParser from "cookie-parser";
import { noteRouter } from "./notes/note-controller.js";
import cors from "cors";
import passport from "passport";
import { passportValidateAdminTokenConfig, passportValidateTokenConfig, } from "./middlewares/auth-middlware.js";
import { adminOnly, userOnly } from "./middlewares/outh-middleware.js";
import { adminRouter } from "./admin/admin-controller.js";
import morgan from "morgan";
import { v4 } from "uuid";
import { error } from "console";
const app = express();
const port = 3000;
dotenv.config({});
if (!process.env.SECRET_KEY)
    throw error("secret_key not found");
app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:5500",
}));
app.use(morgan("dev"));
app.use(express.json({}));
app.use(cookieParser());
passport.use("user-jwt", passportValidateTokenConfig);
passport.use("admin-jwt", passportValidateAdminTokenConfig);
app.use(passport.initialize());
app.use("/", function (req, res, next) {
    try {
        const uuid = v4();
        req.id = uuid;
        next();
    }
    catch (error) {
        next(error);
    }
});
app.use("/public", authRouter);
app.use("/private/admins", passport.authenticate("admin-jwt", { session: false }), adminOnly, adminRouter);
app.use("/private/users", passport.authenticate("user-jwt", { session: false }), userRouter);
app.use("/private", passport.authenticate("user-jwt", { session: false }), userOnly, noteRouter);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
