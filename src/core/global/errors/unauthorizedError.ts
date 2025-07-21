import { StatusCodes } from 'http-status-codes';
import CustomError from './customApiError';

export default class UnauthorizedError extends CustomError {
  statusCode: StatusCodes;

  constructor(message: string){
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}