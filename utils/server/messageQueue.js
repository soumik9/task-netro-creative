import amqp from 'amqplib';
import { errorLogger, logger } from '../helpers/logger/logger.js';

const QUEUE_NAME = 'tasks_queue';
let channel, connection;

const connectToQueue = async () => {
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME);
        logger.info('rabbit mq connected');
    } catch (error) {
        errorLogger.error('Error connecting to RabbitMQ:', error);
        throw error;
    }
}

const sendMessageToQueue = async (message) => {
    try {
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
        logger.info('Message sent to queue:', message);
    } catch (error) {
        console.log('error from queue sent', error);
    }
}

const consumeMessagesFromQueue = async (callback) => {
    channel.consume(QUEUE_NAME, (message) => {
        if (message !== null) {
            const content = message.content.toString();
            const parsedMessage = JSON.parse(content);
            callback(parsedMessage);
            channel.ack(message);
        } else {
            console.log('Consumer cancelled by server');
        }
    });
};

export {
    connectToQueue,
    sendMessageToQueue,
    consumeMessagesFromQueue
}
