const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

const { createUserToken } = require("../middleware/auth");

// ROUTES

//All users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//Get users by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Edit User
router.put("/:id", async (req, res, next) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (userUpdated) {
      res.json(userUpdated);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// Delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser) {
      res.json(deleteUser);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

//Signing up
router.post("/signup", async (req, res, next) => {
  const { email, username} = req.body;
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      email,
      username,
      password,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
});

// Signing in
router.post("/signin", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => createUserToken(req, user))
    .then((token) => res.json({ token }))
    .catch(next);
});

// Logout
// router.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if(err) throw err
//         res.redirect('/')
//     })
// })

module.exports = router;