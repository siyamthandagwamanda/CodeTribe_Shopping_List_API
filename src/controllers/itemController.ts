import { IncomingMessage, ServerResponse } from "http";
import  { ShoppingItem, validateCreateInput, validateUpdateInput } from "../Models/item";
import { sendJson, parseJsonBody } from "../utils/response";

let db: ShoppingItem[] = [
  { id: "1", name: "Milk", quantity: "2L", purchased: false, createdAt: new Date().toISOString() },
  { id: "2", name: "Eggs", quantity: 12, purchased: false, createdAt: new Date().toISOString() },
  { id: "3", name: "Bread", quantity: 1, purchased: true, createdAt: new Date().toISOString() }
];

export async function getAll(res: ServerResponse) {
  sendJson(res, 200, { success: true, data: db });
}

export async function create(req: IncomingMessage, res: ServerResponse) {
  const body = await parseJsonBody(req);
  if (!validateCreateInput(body)) {
    return sendJson(res, 400, { success: false, error: { message: "Validation Failed. Name and quantity required." } });
  }
  const newItem: ShoppingItem = {
    id: Math.random().toString(36).substring(2, 11),
    name: body.name.trim(),
    quantity: body.quantity,
    purchased: false,
    createdAt: new Date().toISOString()
  };
  db.push(newItem);
  sendJson(res, 201, { success: true, data: newItem });
}

export async function getById(res: ServerResponse, id: string) {
  const item = db.find(i => i.id === id);
  if (!item) return sendJson(res, 404, { success: false, error: { message: `Item ${id} not found` } });
  sendJson(res, 200, { success: true, data: item });
}

export async function update(req: IncomingMessage, res: ServerResponse, id: string) {
  const index = db.findIndex(i => i.id === id);
  if (index === -1) return sendJson(res, 404, { success: false, error: { message: `Item ${id} not found` } });

  const body = await parseJsonBody(req);
  if (!validateUpdateInput(body)) {
    return sendJson(res, 400, { success: false, error: { message: "Validation Failed. Bad property data type." } });
  }

  db[index] = {
    ...db[index],
    ...(body.name !== undefined && { name: body.name.trim() }),
    ...(body.quantity !== undefined && { quantity: body.quantity }),
    ...(body.purchased !== undefined && { purchased: body.purchased })
  };
  sendJson(res, 200, { success: true, data: db[index] });
}

export async function remove(res: ServerResponse, id: string) {
  const index = db.findIndex(i => i.id === id);
  if (index === -1) return sendJson(res, 404, { success: false, error: { message: `Item ${id} not found` } });
  
  db = db.filter(i => i.id !== id);
  res.writeHead(204).end();
}
