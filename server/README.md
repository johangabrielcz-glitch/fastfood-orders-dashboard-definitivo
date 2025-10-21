# FastFoodBot API Documentation

Internal REST API for managing food delivery orders.

## Base URL

- **Development**: `http://localhost:8080/api`
- **Production**: `https://YOUR_DOMAIN.vercel.app/api`

## Authentication

This API doesn't require authentication. In production, you should add authentication (API keys, JWT, etc.) based on your security requirements.

## Data Model

### Order (Pedido)

```typescript
interface Pedido {
  id: number; // Unique order ID
  nombre: string; // Customer name
  numero: string; // WhatsApp number (e.g., "584124779301")
  pedido: string; // Order items description
  total: number; // Order total (currency amount)
  estado: EstadoPedido; // Order status
  createdAt?: string; // ISO timestamp
}

type EstadoPedido = "pendiente" | "en camino" | "entregado";
```

## Endpoints

### GET /api/pedidos

Get all orders.

**Response:**

```json
[
  {
    "id": 101,
    "nombre": "Laura Gómez",
    "numero": "584124779301",
    "pedido": "Combo Hamburguesa + Refresco",
    "total": 90,
    "estado": "pendiente",
    "createdAt": "2024-01-15T20:34:13.000Z"
  },
  {
    "id": 102,
    "nombre": "Carlos Pérez",
    "numero": "584125555555",
    "pedido": "Pizza Grande + Papas",
    "total": 120,
    "estado": "en camino",
    "createdAt": "2024-01-15T20:35:20.000Z"
  }
]
```

**Example:**

```bash
curl http://localhost:8080/api/pedidos
```

---

### POST /api/pedidos

Create a new order. Typically called by BuilderBot when a customer places an order via WhatsApp.

**Request Body:**

```json
{
  "id": 103,
  "nombre": "María García",
  "numero": "584126666666",
  "pedido": "3x Hamburguesas + Refresco x3",
  "total": 150,
  "estado": "pendiente" // Optional, defaults to "pendiente"
}
```

**Response:**

```json
{
  "ok": true,
  "mensaje": "Pedido recibido",
  "data": {
    "id": 103,
    "nombre": "María García",
    "numero": "584126666666",
    "pedido": "3x Hamburguesas + Refresco x3",
    "total": 150,
    "estado": "pendiente",
    "createdAt": "2024-01-15T20:36:00.000Z"
  }
}
```

**Example:**

```bash
curl -X POST http://localhost:8080/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "id": 103,
    "nombre": "María García",
    "numero": "584126666666",
    "pedido": "3x Hamburguesas",
    "total": 150
  }'
```

**Error Response (400 - Bad Request):**

```json
{
  "ok": false,
  "mensaje": "Faltan campos requeridos"
}
```

---

### PATCH /api/pedidos/:id

Update order status. When status changes, automatically sends a WhatsApp message to the customer via BuilderBot API.

**Request Parameters:**

- `id` (path) - Order ID to update

**Request Body:**

```json
{
  "estado": "en camino"
}
```

**Valid States:**

- `"pendiente"` - New order received
- `"en camino"` - Order is being delivered
- `"entregado"` - Order delivered

**Response:**

```json
{
  "ok": true,
  "mensaje": "Pedido actualizado",
  "data": {
    "id": 103,
    "nombre": "María García",
    "numero": "584126666666",
    "pedido": "3x Hamburguesas + Refresco x3",
    "total": 150,
    "estado": "en camino",
    "createdAt": "2024-01-15T20:36:00.000Z"
  }
}
```

**WhatsApp Messages Sent:**

When `estado` → `"en camino"`:

```
🚴‍♂️ ¡Hola María García! Tu pedido ya va en camino. Gracias por tu compra 🍔
```

When `estado` → `"entregado"`:

```
🎉 ¡Tu pedido ha sido entregado! Esperamos que lo hayas disfrutado 🍟
```

**Example:**

```bash
curl -X PATCH http://localhost:8080/api/pedidos/103 \
  -H "Content-Type: application/json" \
  -d '{"estado": "en camino"}'
```

**Error Responses:**

400 - Bad Request (missing estado):

```json
{
  "ok": false,
  "mensaje": "Estado es requerido"
}
```

404 - Not Found:

```json
{
  "ok": false,
  "mensaje": "Pedido no encontrado"
}
```

---

### DELETE /api/pedidos/:id

Delete an order. (Optional endpoint, useful for cleanup)

**Request Parameters:**

- `id` (path) - Order ID to delete

**Response:**

```json
{
  "ok": true,
  "mensaje": "Pedido eliminado",
  "data": {
    "id": 103,
    "nombre": "María García",
    "numero": "584126666666",
    "pedido": "3x Hamburguesas + Refresco x3",
    "total": 150,
    "estado": "en camino",
    "createdAt": "2024-01-15T20:36:00.000Z"
  }
}
```

**Example:**

```bash
curl -X DELETE http://localhost:8080/api/pedidos/103
```

---

## Integration with BuilderBot

To integrate with BuilderBot Cloud, set up an HTTP action that sends order data:

### BuilderBot Configuration

1. In BuilderBot Cloud, create an **HTTP** action
2. **Method**: POST
3. **URL**: `https://YOUR_DOMAIN.vercel.app/api/pedidos`
4. **Headers**: `Content-Type: application/json`
5. **Body** (JSON):
   ```json
   {
     "id": "{{order.id}}",
     "nombre": "{{customer.name}}",
     "numero": "{{customer.phone}}",
     "pedido": "{{order.items}}",
     "total": {{order.total}}
   }
   ```

When a customer places an order via your WhatsApp bot, BuilderBot will automatically POST to this endpoint, and the order will appear in your dashboard.

## Status Transitions

Recommended status flow:

```
pendiente → en camino → entregado
  ↓          ↓
  └──────────┘ (can skip "en camino")
```

- **Pendiente**: Initial state when order is received
- **En camino**: Order is being prepared/delivered
- **Entregado**: Order successfully delivered

## Response Format

All API responses follow a standard format:

### Success Response

```json
{
  "ok": true,
  "mensaje": "Description of what happened",
  "data": {
    /* response data */
  }
}
```

### Error Response

```json
{
  "ok": false,
  "mensaje": "Error description"
}
```

## HTTP Status Codes

| Code | Meaning                            |
| ---- | ---------------------------------- |
| 200  | OK - Request succeeded             |
| 201  | Created - New resource created     |
| 400  | Bad Request - Invalid data         |
| 404  | Not Found - Resource doesn't exist |
| 500  | Server Error                       |

## Environment Variables

The API uses these environment variables:

- `BUILDERBOT_BOT_ID` - Your BuilderBot Cloud bot ID
- `BUILDERBOT_API_KEY` - Your BuilderBot Cloud API key
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development, production)

## Rate Limiting

Currently, there is no rate limiting. For production, consider adding:

- IP-based rate limiting
- Request validation
- Authentication/API keys
- CORS restrictions

## Error Handling

- Invalid JSON returns 400
- Missing required fields returns 400
- Non-existent order returns 404
- Malformed requests return 400

## Example Workflow

### 1. Customer orders via WhatsApp bot

BuilderBot sends:

```bash
POST /api/pedidos
{
  "id": 101,
  "nombre": "Laura",
  "numero": "584124779301",
  "pedido": "Combo Hamburguesa",
  "total": 90
}
```

### 2. Order appears in dashboard

Dashboard polls `GET /api/pedidos` every 7 seconds

### 3. Staff marks as "en camino"

Dashboard sends:

```bash
PATCH /api/pedidos/101
{ "estado": "en camino" }
```

Server sends WhatsApp: "🚴‍♂️ ¡Tu pedido va en camino!"

### 4. Staff marks as "entregado"

Dashboard sends:

```bash
PATCH /api/pedidos/101
{ "estado": "entregado" }
```

Server sends WhatsApp: "🎉 ¡Tu pedido ha sido entregado!"

## Testing

### Test with curl

```bash
# Get all orders
curl http://localhost:8080/api/pedidos

# Create test order
curl -X POST http://localhost:8080/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{"id": 999, "nombre": "Test", "numero": "584124779301", "pedido": "Test", "total": 99}'

# Update order status
curl -X PATCH http://localhost:8080/api/pedidos/999 \
  -H "Content-Type: application/json" \
  -d '{"estado": "en camino"}'

# Delete order
curl -X DELETE http://localhost:8080/api/pedidos/999
```

### Test with JavaScript/Fetch

```javascript
// Get orders
const orders = await fetch("/api/pedidos").then((r) => r.json());
console.log(orders);

// Create order
const newOrder = await fetch("/api/pedidos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: 999,
    nombre: "Test",
    numero: "584124779301",
    pedido: "Test",
    total: 99,
  }),
}).then((r) => r.json());

// Update order
const updated = await fetch("/api/pedidos/999", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ estado: "en camino" }),
}).then((r) => r.json());
```

---

For more information, see [VERCEL_DEPLOYMENT.md](../VERCEL_DEPLOYMENT.md)
