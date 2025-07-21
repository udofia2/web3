/* eslint-disable @typescript-eslint/no-explicit-any */
import {v4} from "uuid";
import {getChannel} from "./connection";
import {RPC_QUEUE_TYPE} from "./rpc.interface";

const _requestData = async (RPC_QUEUE_NAME: RPC_QUEUE_TYPE, requestPayload: any, uuid: any) => {
    try {
        const channel = await getChannel();
        const q = await channel.assertQueue("", { exclusive: true });

        if (!q || !q.queue) {
            throw new Error("Failed to assert queue");
        }

        channel.sendToQueue(
            RPC_QUEUE_NAME,
            Buffer.from(JSON.stringify(requestPayload)),
            {
                replyTo: q.queue,
                correlationId: uuid,
            }
        );

        return new Promise((resolve, reject) => {
            channel.consume(
                q.queue,
                (msg:any) => {
                    if (msg.properties.correlationId == uuid) {
                        resolve(JSON.parse(msg.content.toString()));
                    } else {
                        reject("data Not found!");
                    }
                },
                {
                    noAck: true,
                }
            );
        });
    }
    catch (error) {
        console.log(error);
    }
};

export const RPCRequest = async (RPC_QUEUE_NAME: RPC_QUEUE_TYPE, requestPayload: any) => {
    const uuid = v4();
    return await _requestData(RPC_QUEUE_NAME, requestPayload, uuid);
}