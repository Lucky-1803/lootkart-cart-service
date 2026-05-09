const { createClient } = require("redis");

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    },
    username: "default",
    password: process.env.REDIS_PASSWORD
});

client.on("error", err => console.log("Redis error", err));

const connectRedis = async () => {
    await client.connect();
    console.log("Redis connected successfully");
};

module.exports = { client, connectRedis };