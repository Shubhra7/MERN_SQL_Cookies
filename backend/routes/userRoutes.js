import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = "helloJwtSecret";

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });
  res.json({ success: true, message: "User registered", userId: user.id });
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login tried");
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Wrong password!" });

    const token = jwt.sign(
      {
        id: user.id,
      },
      SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

// Middleware to verify token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Not logged in!" });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

router.get("/profile", verifyUser, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json({ id: user.id, username: user.username, email: user.email });
});

// Logout route
router.post("/logout",(req,res)=>{
    res.clearCookie("token",{
        httpOnly: true,
        sameSite: "none",
        secure: false
    });
    res.json({success:true, message:"Logged out successfully."});
})

export default router;
