const {client} = require('../config/redis')

const getCartKey = (userId)=> `cart:${userId}`

const addToCart =async (userId,item)=>{

    const key = getCartKey(userId)

    const cart = JSON.parse(await client.get(key)) || []

    const existing = cart.find(i => i.productId === item.productId)

    if(existing){
        existing.quantity += item.quantity
    }else {
        cart.push(item)
    }

    await client.set(key, JSON.stringify(cart))
    await client.expire(key ,86400)

    return cart
}

const getCart =async(userId)=>{
    const key = getCartKey(userId)
    return JSON.parse(await client.get(key)) || []
}

const removeItem =async(userId,productId)=>{
    const key = getCartKey(userId)

    let cart = JSON.parse(await client.get(key)) || []

    cart = cart.filter(i => i.productId !== productId)

    await client.set(key,JSON.stringify(cart))
    return cart
}

const clearCart = async(userId)=>{
    await client.del(getCartKey(userId))
}

module.exports = {addToCart,getCart,removeItem,clearCart}