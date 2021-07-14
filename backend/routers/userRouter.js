import express from 'express'
import data from '../data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js';
// import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

// userRouter.get('/seed', expressAsyncHandler( async (req, res)=> {
//     //  remove all
//     // await User.remove({})
//     const createdUsers = await User.insertMany(data.users)
//     res.send({createdUsers})
// }))

userRouter.get('/seed',  async (req, res)=> {
    //  remove all
    // await User.remove({})
    await User.insertMany(data.users).then(data=>{
        res.send(data)
    }).catch(err=> res.send({message:err.message, code: err.code}))
    
})

userRouter.post('/siginin', async (req, res)=>{
    await User.findOne({email: req.body.email})
        .then(data=>{
            if(bcrypt.compareSync(req.body.password, data.password)){
                res.send({
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    token: generateToken(data)
                })
            }
        })
        .catch(err=>res.status(401).send({message: err.message}))
})

export default userRouter