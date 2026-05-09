const service = require('../services/cart.service')

const add = async(req,res)=>{
    try {
        const data = await service.addToCart(req.params.userId,req.body)
        res.json(data)        
    } catch (error) {
        res.status(500).json({message : error.message})        
    }
}

const get = async(req,res)=>{

    try {
        const data = await service.getCart(req.params.userId)
        res.json(data)
        
    } catch (error) {
        res.status(500).json({message : error.message})        
        
    }

}

const remove = async(req,res)=>{

    try {
        const data = await service.removeItem(req.params.userId,req.params.productId)
        res.json(data)        
    } catch (error) {
        res.status(500).json({message : error.message})               
    }
}

module.exports = {add,get,remove}