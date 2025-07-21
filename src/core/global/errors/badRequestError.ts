import { StatusCodes } from 'http-status-codes';
import CustomError  from './customApiError';

export default class BadRequestError extends CustomError {
  statusCode: number;
  
  constructor(message: string ) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

