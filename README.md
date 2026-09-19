<img src="https://socialify.git.ci/siyamthandagwamanda/CodeTribe_Shopping_List_API/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="CodeTribe_Shopping_List_API" width="640" height="320" />

ShoppingList-API
Simple Node + TypeScript HTTP API for managing a shopping list.

🚀 Getting Started
Prerequisites
Node.js (v22.17+ recommended)
TypeScript
Postman, Thunderclient or curl (for testing API requests)
Clone and Installation
# Clone the repository and use any terminal 
git clone https://github.com/siyamthandagwamandaCodeTribe_Shopping_List_API/.git
cd CodeTribe_Shopping_List_APIs

# Install dependencies
npm install

# Start the server (development)
npm run dev
The server runs at http://localhost:3000.

📁 Project Structure
├── src/
│   ├── controllers/
│   │   └── itemsController.ts      # In-memory store + CRUD logic
│   ├──/
│   │   └── router.ts      # HTTP route handler for /items
│   ├── Model/
│   │   └── items.ts      # Item interface
│   └── server.ts         # HTTP server & router
├── package.json
├── tsconfig.json
└── README.md

🧠 Core Features
Add an item — POST /items
Get all items — GET /items
Get item by ID — GET /items/:id
Update an item — PUT /items/:id
Delete an item - DELETE /items/:id

Item shape (src/Model/items.ts):

interface Item {
  id: number
  name: string
  purchased: boolean
  quantity: number
  price: number
}

📫 API Endpoints
➕ Add an Item
POST /items

Request Body (JSON)

{ "name": "Milk", "purchased": false, "quantity": 2, "price": 10 }
Response

{ "id": 1, "name": "Milk", "purchased": false, "quantity": 2, "price": 10 }
📄 Get All Items
GET /items

Response

[
  { "id": 1, "name": "Milk", "purchased": false, "quantity": 2, "price": 10 }
]
🔍 Get Single Item
GET /items/:id

Response

{ "id": 1, "name": "Milk", "purchased": false, "quantity": 2, "price": 10 }
✏️ Update Item
PUT /items/:id

Request Body (JSON — all fields required by route)

{ "name": "Milk", "purchased": true, "quantity": 3, "price": 12 }
Response

{ "id": 1, "name": "Milk", "purchased": true, "quantity": 3, "price": 12 }
Notes:

The controller supports partial updates internally, but the current route validates all fields. If you want partial updates via the route, relax those validations in src/routes/items.ts.

🧪 Testing with curl
# Create
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Apples","purchased":false,"quantity":5,"price":10}'

# Read all
curl http://localhost:3000/items

# Read one
curl http://localhost:3000/items/1

# Update
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Green Apples","purchased":true,"quantity":6,"price":12}'

⚠️ Error Handling
All error responses follow a consistent JSON format:

{"error": "Description of the error"}
400 Bad Request: Invalid JSON payload or missing/invalid fields
404 Not Found: Item not found