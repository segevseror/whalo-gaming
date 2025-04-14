import express from 'express';
import { routes } from './api/routes/player.route';
import connectMongoDB from './models/db/mongo.db';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/api/', routes);

// Initialize connections
connectMongoDB();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Microservice Management is running on port ${PORT}`);
});

export default app; 