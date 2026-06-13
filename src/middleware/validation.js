import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Validaciones para crear/actualizar transacción
export const validateTransaction = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
    .trim(),
  
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  
  body('originalAmount')
    .notEmpty().withMessage('Original amount is required')
    .isFloat({ min: 0 }).withMessage('Original amount must be a positive number'),
  
  body('originalCurrency')
    .notEmpty().withMessage('Original currency is required')
    .isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters (USD, EUR, etc.)')
    .toUpperCase(),
  
  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['income', 'expense']).withMessage('Type must be "income" or "expense"'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .trim(),
  
  body('date')
    .notEmpty().withMessage('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format'),
  
  body('isLiked')
    .optional()
    .isBoolean().withMessage('isLiked must be a boolean'),
  
  handleValidationErrors
];

export const validateRegister = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .trim(),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  handleValidationErrors
];

export const validateLogin = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  handleValidationErrors
];

export const validateId = [
  body('id')
    .isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors
];