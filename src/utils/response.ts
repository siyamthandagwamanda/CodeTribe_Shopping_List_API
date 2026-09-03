import { IncomingMessage, ServerResponse } from "http"

export interface ApiResponse<T = any>{
    success: boolean;
    data?: T;
    error?: {
        message: string;
        details?: any;
    };
}

export function sendJson<T>(
    res: ServerResponse,
    statusCode: number,
    payload: ApiResponse<T>
): void {
    res.writeHead(statusCode, {"content-type": "application/json"})
    res.end(JSON.stringify(payload))
}