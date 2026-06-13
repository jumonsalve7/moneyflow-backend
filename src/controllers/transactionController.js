import Transaction from '../models/Transaction.js';
import { 
  normalizeTransaction, 
  validateTransactionObject,
  isValidAmount,
  isValidCurrency
} from '../utils/validators.js';

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    console.error('Error in getTransactions:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error while fetching transactions' 
    });
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        error: 'Transaction not found' 
      });
    }
    
    // Verify user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to access this transaction' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: transaction 
    });
  } catch (error) {
    console.error('Error in getTransaction:', error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        error: 'Transaction not found' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Server error while fetching transaction' 
    });
  }
};

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res) => {
  try {
    // Normalize incoming data
    const normalizedData = normalizeTransaction(req.body);
    
    // Validate required fields
    const validation = validateTransactionObject(normalizedData);
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        errors: validation.errors 
      });
    }
    
    // Additional business validations
    if (!isValidAmount(normalizedData.amount)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Amount must be a positive number' 
      });
    }
    
    if (!isValidCurrency(normalizedData.originalCurrency)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Currency must be a valid 3-letter code (USD, EUR, COP, etc.)' 
      });
    }
    
    const transaction = await Transaction.create({
      ...normalizedData,
      user: req.user.id
    });
    
    res.status(201).json({ 
      success: true, 
      data: transaction 
    });
  } catch (error) {
    console.error('Error in createTransaction:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        error: 'Duplicate transaction detected' 
      });
    }
    
    // Handle validation errors from mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        error: messages.join(', ') 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Server error while creating transaction' 
    });
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        error: 'Transaction not found' 
      });
    }
    
    // Verify user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to update this transaction' 
      });
    }
    
    // Normalize and validate update data
    const normalizedData = normalizeTransaction(req.body);
    const validation = validateTransactionObject(normalizedData);
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        errors: validation.errors 
      });
    }
    
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      normalizedData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({ 
      success: true, 
      data: transaction 
    });
  } catch (error) {
    console.error('Error in updateTransaction:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        error: 'Transaction not found' 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        error: messages.join(', ') 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Server error while updating transaction' 
    });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        error: 'Transaction not found' 
      });
    }

    // Verify user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to delete this transaction' 
      });
    }
    
    await transaction.deleteOne();
    
    res.status(200).json({ 
      success: true, 
      data: {},
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteTransaction:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        error: 'Transaction not found' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Server error while deleting transaction' 
    });
  }
};