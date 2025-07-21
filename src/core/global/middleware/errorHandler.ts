/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';

const errorHandlerMiddleware = (err: any, req: Request, res: Response) => {
  console.log("error caught")
  logger.error(err);
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.statusCode == 500 ?  'Something went wrong' : err.message,
  };

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',');
    customError.statusCode = 400;
  }

  if (err.name === 'PrismaClientValidationError') {
    customError.message = 'Something went wrong'
    customError.statusCode = 500;
  }

  if (err.name.startsWith('Prisma')) {
    customError.message = 'Something went wrong'
    customError.statusCode = 500;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  Sentry.captureException(err);

  Sentry.logger.error(customError.message, {
    message: customError.message,
    statusCode: customError.statusCode,
    stack: err.stack,
  })
  
  res.status(customError.statusCode).json({ 
      status: false,
      error: true,
      statusCode: `${customError.statusCode}`,
      message: customError.message 
  });
  return 
};

export default errorHandlerMiddleware;