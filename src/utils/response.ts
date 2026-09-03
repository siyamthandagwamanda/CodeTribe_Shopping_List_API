import { IncomingMessage, ServerResponse } from "http"

export interface ApiResponse<T = any>{
    success: boolean;
    data?: T;
    error?: {
        message: string;
        details?: any;
    };
}