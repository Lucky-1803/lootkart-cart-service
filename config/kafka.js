const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "cart-service",
    brokers: [process.env.KAFKA_BROKER],

    ssl: true,

    sasl: {
        mechanism: "scram-sha-256",
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD
    }
});

const consumer = kafka.consumer({
    groupId: "cart-group"
});

module.exports = consumer;