import { registerUser, loginUser } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router()
router.get("/test", (req, res) => {
    res.status(200).json({ message: "User route is working!" });
});

router.route("/register").post(registerUser)
router.post("/login", loginUser);

export default router