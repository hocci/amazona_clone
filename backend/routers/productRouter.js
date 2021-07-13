import data from "../data.js"
import Product from "../models/productModel.js"

import express from 'express'

const productRouter = express.Router()

productRouter.get('/', async (req, res)=>{
    await Product.find({})
        .then(data=> res.send(data))
        .catch(err=> res.status(400).send(err.message))
})

productRouter.get('/seed', async (req, res)=>{
    await Product.insertMany(data.products)
        .then(data=>res.send(data))
        .catch(err=> res.status(400).send(err.message))
})

productRouter.get('/:id', async (req, res)=>{
    await Product.findById(req.params.id)
        .then(data=>res.send(data))
        .catch(err=> res.status(404).send({message: "Product Not Found"}))
})

export default productRouter