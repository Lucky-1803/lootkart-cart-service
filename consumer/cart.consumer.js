const consumer = require('../config/kafka')
const { client } = require('../config/redis')

const runConsumer = async()=>{

    await consumer.connect()

    await consumer.subscribe({topic:"product.updated"})
    await consumer.subscribe({topic:"product.deleted"})

    consumer.run({
        eachMessage:async({topic,message})=>{

            const data = JSON.parse(message.value.toString())

            const keys = await client.keys("cart:*")

            for(let key of keys){

                let cart = JSON.parse(await client.get(key))||[]

                if(topic === "product.updated"){
                    cart = cart.map(item => item.productId === data.id ? {...item , price:data.price}:item)
                }

                if(topic === "product.deleted"){
                    cart = cart.filter(item => item.productId !== data._id)
                }

                await client.set(key,JSON.stringify(cart))
            }
        }
    })
}

module.exports = runConsumer