import express from 'express'
import data from '../data.js';
import User from '../models/userModel.js';
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

export default userRouter