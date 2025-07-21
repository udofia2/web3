"use strict";
import pino from 'pino';

const transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: "UTC:yyyy-mm-dd'T'HH:mm:ss",
      ignore: 'pid,hostname'
    }
  }

// const transportProd = {
//     target: "@logtail/pino",
//     options: {
//         sourceToken: process.env.logtail_token
//     }
// }


const logger = pino({
    transport: transport
});

logger.info(`========== LOGGER ACTIVE FOR ${process.env.NODE_ENV} ===========`)


export default logger