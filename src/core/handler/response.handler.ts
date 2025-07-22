
export interface ApiResponse<T = unknown> {
    status: boolean;
    message: string;
    responseCode?: string;
    data?: T;
}

export class ResponseHandler {
    static success<T>(data: T, responseCode = "00", message = "Approved or Completed Successfully"): ApiResponse<T>{
        return {
            status: true,
            responseCode,
            message,
            data,
        }
    }

    static failure(message: string, responseCode?: string): ApiResponse<any> {
        return {
            status: false,
            responseCode,
            message,
        }
    }

    static error(error: unknown): ApiResponse<null> {
        let message = "Somthing went wrong";
        if(error instanceof Error) {
            message= error.message;
        }
        return {
            status: false,
            message,
            data: null,
        }
    }
}