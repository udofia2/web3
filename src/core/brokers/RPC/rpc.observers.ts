/* eslint-disable @typescript-eslint/no-explicit-any */
import {getChannel} from "./connection";
import {RPC_QUEUE_TYPE} from "./rpc.interface";

export const RPCObserver = async (RPC_QUEUE_NAME: RPC_QUEUE_TYPE, service:any) => {
    const channel = await getChannel();
    await channel.assertQueue(RPC_QUEUE_NAME, { durable: false });

    await channel.prefetch(1);
    await channel.consume(
        RPC_QUEUE_NAME,
        async (msg: any) => {
            if (msg?.content) {
                //DB Operation
                const payload = JSON.parse(msg.content.toString());
                const response = await service.ServeRPCRequests(payload);

                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify(response)),
                    {
                        correlationId: msg.properties.correlationId
                    }
                );
                channel.ack(msg);
            }
        },
        {
            noAck: false
        }
    )
}
