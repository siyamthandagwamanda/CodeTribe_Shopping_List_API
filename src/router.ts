import { IncomingMessage, ServerResponse } from "http";
import { sendJson } from "./utils/response";
import * as controller from "./controllers/itemController";

export async function handleRoutes(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const { method, url = "" } = req;

  try {
    if (method === "GET" && url === "/items") return await controller.getAll(res);
    if (method === "POST" && url === "/items") return await controller.create(req, res);

    if (url && url.startsWith("/items/")) {
      const parts = url.split("/");
      const id = parts[2]

      if (!id || id.trim() === "") {
        return sendJson(res, 400, { success: false, error: { message: "Item ID is missing" } });
      }

      if (method === "GET") return await controller.getById(res, id);
      if (method === "PUT") return await controller.update(req, res, id);
      if (method === "DELETE") return await controller.remove(res, id);
    }

    return sendJson(res, 404, { success: false, error: { message: `Route ${method} ${url} not found` } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return sendJson(res, 500, { success: false, error: { message: "Internal server error", details: message } });
  }
}
