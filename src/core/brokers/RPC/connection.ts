/* eslint-disable @typescript-eslint/no-explicit-any */
import { Channel, ChannelModel, connect } from 'amqplib';

let AMQ_CONNECTION: ChannelModel;

export const getChannel = async (): Promise<Channel | any> => {
    if (process.env.NODE_ENV === 'test') {
        return {
            assertQueue: async () => {},
            sendToQueue: () => {},
            consume: () => {},
            ack: () => {},
            prefetch: () => {},
        };
    } else {
        if (!AMQ_CONNECTION) {
            AMQ_CONNECTION = await connect(process.env.AMPQ_SERVER!).catch(error => {
                console.error('Failed to connect to AMQP server:', error);
                throw new Error('AMQP connection failed');
            })
        }
        return await AMQ_CONNECTION.createChannel();
    }
};