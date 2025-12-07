# Finance Calculator Backend

A simplified Node.js/Express REST API backend for the Finance Calculator demo application with SQLite database.

## Features

- 📊 Finance quote management (CRUD operations)
- 🗃️ SQLite database with Prisma ORM
- ✅ Request validation with Zod
- 🔒 Security middleware (Helmet, CORS)
- 📝 TypeScript support

## API Endpoints

### Quotes
- `POST /api/quotes` - Create new quote
- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/:id` - Get specific quote
- `PUT /api/quotes/:id` - Update quote
- `DELETE /api/quotes/:id` - Delete quote

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
3. Configure your `.env` file with your settings

4. Set up the database:
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `DATABASE_URL` - SQLite database file path
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Frontend URL for CORS

## Database Schema

### Quote
- id (String, Primary Key)
- name (String)
- Finance data: cost, profit, sellingPrice, term, rate, outOfPocket, taxRate
- Calculated results: taxes, baseLoanAmount, interest, totalLoanAmount, payment
- createdAt (DateTime)
- updatedAt (DateTime)

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run db:studio` - Open Prisma Studio database browser

## API Usage Examples

### Create Quote
```bash
curl -X POST http://localhost:3001/api/quotes \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Quote","financeQuote":{"cost":10000,"profit":2000,"sellingPrice":12000,"term":12,"rate":5.5,"outOfPocket":1000,"taxRate":8.25},"result":{"taxes":990,"baseLoanAmount":12990,"interest":714.45,"totalLoanAmount":12704.45,"payment":1058.7,"outOfPocket":1000}}'
```

### Get All Quotes
```bash
curl http://localhost:3001/api/quotes
```