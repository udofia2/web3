import { StatusCodes } from 'http-status-codes';
import CustomError from './customApiError';

export default class TimeoutError extends CustomError {
  statusCode: number;

  constructor(message: string ) {
    super(message);
    this.statusCode = StatusCodes.GATEWAY_TIMEOUT;
  }
}
