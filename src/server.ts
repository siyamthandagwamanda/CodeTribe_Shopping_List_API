import { createServer, IncomingMessage, ServerResponse } from "http";
import { handleRoutes } from "./router";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204).end();
    return;
  }

  
  await handleRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`[🚀 RUNNING] Production Server online at http://localhost:${PORT}`);
});
