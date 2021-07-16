import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
// import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

// userRouter.get('/seed', expressAsyncHandler( async (req, res)=> {
//     //  remove all
//     // await User.remove({})
//     const createdUsers = await User.insertMany(data.users)
//     res.send({createdUsers})
// }))

userRouter.get("/seed", async (req, res) => {
  //  remove all
  // await User.remove({})
  await User.insertMany(data.users)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send({ message: err.message, code: err.code }));
});

userRouter.post("/signin", async (req, res) => {
  console.log("signin");
  await User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          res.send({
            _id: data._id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin,
            token: generateToken(data),
          });
        } else {
          res.status(401).send({ message: "wrong password" });
        }
      } else {
        res.status(401).send({ message: "no this email" });
      }
    })
    .catch((err) => res.status(401).send({ message: err.message }));
});

userRouter.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  await user
    .save()
    .then((data) => {
      res.send({
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        token: generateToken(data),
      });
    })
    .catch((error) => {
      if (error.code == 11000) {
        res.status(401).send({ message: "duplicate email" });
      } else {
        res.status(401).send({ message: error.message });
      }
    });
});

export default userRouter;
