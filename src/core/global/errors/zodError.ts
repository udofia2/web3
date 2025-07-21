import { StatusCodes } from 'http-status-codes';
import CustomError  from './customApiError';

export default class ZodError extends CustomError {
  statusCode: number;
  
  constructor(message: { message: string; }) {    
        console.log(message)    
        const msg = JSON.parse(message.message)[0]
        super(msg.message);
        this.statusCode = StatusCodes.BAD_REQUEST;
  }
  
}

