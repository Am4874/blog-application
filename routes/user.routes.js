const { Router } = require("express");
const User = require("../models/user.model");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email,password);
  // await User.findOne({
  //   email,
  //   password
  // })
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    // console.log("Token :",token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email Or Password !!",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    await User.create({
      fullName,
      email,
      password,
    });

    return res.redirect("/");
  } catch (error) {
    return res.render("signup", {
      error: "Something wrong while create account !!",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
