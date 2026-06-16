import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';
import authRoutes from './routes/authRoutes.js'; // ✅ Importante
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS configurado correctamente
app.use(cors({
  origin: [
    'https://moneyflow-frontend-alpha.vercel.app',
    'https://moneyflow-frontend-gvi54dpjg-moneyflow-frontend.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Rutas de autenticación
app.use('/api/auth', authRoutes); // ← Aquí debe estar
app.use('/api/transactions', transactionRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'MoneyFlow API is running' });
});

app.use(errorHandler);

export default app;