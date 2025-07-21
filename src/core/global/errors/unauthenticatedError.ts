import { StatusCodes } from 'http-status-codes';
import CustomError from './customApiError';

export default class UnauthenticatedError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

