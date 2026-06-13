import express from 'express';
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController.js';
import { protect } from '../middleware/auth.js';
import { validateTransaction, validateId } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTransactions)
  .post(validateTransaction, createTransaction);  // 👈 Agregada validación

router.route('/:id')
  .get(getTransaction)
  .put(validateTransaction, updateTransaction)    // 👈 Agregada validación
  .delete(deleteTransaction);

export default router;