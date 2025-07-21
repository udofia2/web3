// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { EventEmitter } from 'events';
// import { EventType, EventPayloads } from './event.types';
// // import {dlq} from "./event.dlq";

// export class VistaEventBus {

//     private emitter = new EventEmitter();
//     private subscriptions = new Map<EventType, Array<(payload: EventPayloads[EventType]) => Promise<void>>>();

//     async publish<T extends EventType>(type: T, payload: EventPayloads[T]): Promise<void> {
//         this.emitter.emit(type, payload);
//     }

//     async subscribe<T extends EventType>(type: T, handler: (payload: EventPayloads[T]) => Promise<void>, serviceName: string): Promise<void> {
//         const wrappedHandler = async (payload: EventPayloads[T]) => {
//             try { await handler(payload) }
//             catch (error: any) {
//                 // await dlq.addFailedEvent(type, payload, error, {
//                 //     service: serviceName,
//                 //     retryCount: 0,
//                 // });
//             }
//         };

//         this.emitter.on(type, wrappedHandler);
//         this.subscriptions.set(type, [
//             ...(this.subscriptions.get(type) || []),
//             wrappedHandler,
//         ]);
//     }
// }

// export const eventBus = new VistaEventBus();