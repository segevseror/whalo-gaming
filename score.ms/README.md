# TypeScript Microservice

A simple TypeScript microservice with Express, following best practices and proper separation of concerns.

## Project Structure

```
src/
├── app.ts              # Main application file
├── routes/             # Route definitions
│   └── routes.ts
├── controllers/        # Request handlers
│   └── mg.controller.ts
└── services/          # Business logic
    └── mg.service.ts
```

## Features

- TypeScript with Express
- Proper separation of concerns (Routes, Controllers, Services)
- In-memory user management
- RESTful API endpoints
- Error handling
- Type safety

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /health` - Health check endpoint

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run in production mode:
   ```bash
   npm start
   ```

## Example Usage

Create a new user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

Get all users:
```bash
curl http://localhost:3001/api
``` 