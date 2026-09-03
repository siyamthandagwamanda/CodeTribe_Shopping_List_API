import { IncomingMessage, ServerResponse } from "http";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: unknown;
  };
}

export function sendJson<T>(
  res: ServerResponse,
  statusCode: number,
  payload: ApiResponse<T>
): void {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

export function parseJsonBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      const body = Buffer.concat(chunks).toString("utf-8");

      if (!body.trim()) {
        resolve({} as T);
        return;
      }

      try {
        resolve(JSON.parse(body) as T);
      } catch {
        reject(new Error("Invalid JSON payload"));
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}
