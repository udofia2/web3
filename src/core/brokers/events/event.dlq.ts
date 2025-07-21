// import { EventType } from "./event.types";
// import { eventBus } from "./event.bus";
// import { prisma } from "../../DB";
//
// export class DeadLetterQueue {
//     private maxRetries = 10;
//     private retryDelay = 5000;
//
//     async addFailedEvent<T extends EventType>(eventType: T, payload: any, error: Error, context: { service: string; retryCount: number; }): Promise<void> {
//         await prisma.dLQEntry.create({
//             data: {
//                 eventType,
//                 payload,
//                 error: {
//                     message: error.message,
//                     stack: error.stack,
//                 },
//                 service: context.service,
//                 retryCount: context.retryCount,
//                 timestamp: new Date(),
//             }
//         });
//
//         if (context.retryCount < this.maxRetries) {
//             this.retryFailedEvents(context.service);
//         }
//     }
//
//     async getFailedEvents(service: string): Promise<any[]> {
//         return prisma.dlqentry.findMany({
//             where: { service }
//         });
//     }
//
//     async retryFailedEvents(service: string): Promise<void> {
//         const failedEvents = await this.getFailedEvents(service);
//
//         for (const event of failedEvents) {
//             if (event.retryCount >= this.maxRetries) {
//                 console.error(`❌ Event ${event.eventType} permanently failed after max retries`);
//                 continue;
//             }
//
//             setTimeout(async () => {
//                 try {
//                     console.log(`🔄 Retrying event ${event.eventType} (Attempt: ${event.retryCount + 1})`);
//                     await eventBus.publish(event.eventType as EventType, event.payload as any);
//                     await prisma.dlqentry.delete({
//                         where: { id: event.id }
//                     });
//                 }
//                 catch (error) {
//                     console.error(`⚠️ Retry failed for event ${event.eventType}:`, error);
//                     await prisma.dlqentry.update({
//                         where: { id: event.id },
//                         data: {
//                             retryCount: { increment: 1 },
//                             timestamp: new Date()
//                         }
//                     });
//                 }
//             }, this.retryDelay * (event.retryCount + 1));
//         }
//     }
// }
//
// export const dlq = new DeadLetterQueue();