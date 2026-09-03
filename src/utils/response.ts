import { rejects } from "assert";
import { resolve } from "dns";
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

export function parseJsonBody<T>(req: IncomingMessage): Promise<T>{
    return new Promise((resolve, rejects) => {
        let body = "";

        req.on("data", (chunks) => {
            body += chunks.toString();
        })

        req.on("end", () => {
            if (!body.trim()){
                resolve({} as T);
                return;
            }
            try{
                resolve(JSON.parse(body) as T);
            }catch(err){
                rejects(new Error("Malformed JSON payload structure"))
            }
        });

        req.on("error", (err) => {
            rejects(err)
        })
        
    })
}