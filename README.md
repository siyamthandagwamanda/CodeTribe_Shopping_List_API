<img src="https://socialify.git.ci/siyamthandagwamanda/CodeTribe_Shopping_List_API/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="CodeTribe_Shopping_List_API" width="640" height="320" />

#Node.js & TypeScript Shopping List REST API

A lightweight, zero-dependency REST API engineered purely with the Node.js native `http` module and strict TypeScript.

## 🛠️ Technology Stack & Architecture
- **Language:** TypeScript (Strict Compilation Mode)
- **Runtime Environment:** Node.js (Frameworkless HTTP Core Module)
- **Pattern:** Router-Controller Architecture
- **Testing Engine:** Postman / Newman Automation

---

## 🚀 Local Development Setup Instruction Flow

1. **Install Project Dependencies**
   ```bash
   npm install
   ```

2. **Boot Live Local Hot-Reload Dev Engine**
   ```bash
   npm run dev
   ```

3. **Build Target Output Bundles into Native JavaScript**
   ```bash
   npm run build
   ```

4. **Boot Up Production Engine Compiled Target**
   ```bash
   npm run start
   ```

5. **Execute Headless Integration Endpoint Verification Tests**
   ```bash
   npm run test:api
   ```

---

## 🎛️ API Endpoint Matrix Specification Route Contracts

All pipeline returns strictly enforce a uniform response wrapper format (`ApiResponse<T>`).

| HTTP Method | API Route Path | Body Payload Structure Input Shape | Status Outcomes |
| :--- | :--- | :--- | :--- |
| **GET** | `/items` | None | `200 OK` |
| **POST** | `/items` | `{ "name": string, "quantity": string \| number }` | `201 Created`, `400 Bad Request` |
| **GET** | `/items/:id` | Path parameter string matching resource `id` | `200 OK`, `404 Not Found` |
| **PUT** | `/items/:id` | `{ "name"?: string, "quantity"?: string \| number, "purchased"?: boolean }` | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/items/:id` | Path parameter string matching resource `id` | `204 No Content`, `404 Not Found` |


