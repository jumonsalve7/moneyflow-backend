export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password) => {
  const strongRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return strongRegex.test(password);
};

export const isValidAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= 0 && isFinite(num);
};

export const isValidCurrency = (currency) => {
  const currencyRegex = /^[A-Z]{3}$/;
  return currencyRegex.test(currency);
};

export const isValidDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

export const isValidCategory = (category) => {
  return category && category.trim().length >= 2 && category.trim().length <= 50;
};

export const isValidName = (name) => {
  return name && name.trim().length >= 1 && name.trim().length <= 100;
};

export const sanitizeString = (str) => {
  if (!str) return '';
  return str.trim().replace(/[<>]/g, '');
};

export const formatAmount = (amount, currency = 'USD') => {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    CHF: 'CHF',
    CNY: '¥',
    MXN: '$',
    COP: 'COL$'
  };
  
  const symbol = symbols[currency] || currency;
  
  if (currency === 'COP') {
    return `${symbol} ${Math.round(amount).toLocaleString('es-CO')}`;
  }
  
  if (currency === 'JPY') {
    return `${symbol}${Math.round(amount)}`;
  }
  
  return `${symbol}${amount.toFixed(2)}`;
};

export const isValidType = (type) => {
  return type === 'income' || type === 'expense';
};

export const validateTransactionObject = (transaction) => {
  const errors = [];
  
  if (!isValidName(transaction.name)) {
    errors.push('Name must be between 1 and 100 characters');
  }
  
  if (!isValidAmount(transaction.amount)) {
    errors.push('Amount must be a positive number');
  }
  
  if (!isValidCurrency(transaction.originalCurrency)) {
    errors.push('Currency must be 3 uppercase letters (USD, EUR, etc.)');
  }
  
  if (!isValidType(transaction.type)) {
    errors.push('Type must be "income" or "expense"');
  }
  
  if (!isValidCategory(transaction.category)) {
    errors.push('Category must be between 2 and 50 characters');
  }
  
  if (!isValidDate(transaction.date)) {
    errors.push('Date must be in YYYY-MM-DD format');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUserObject = (user) => {
  const errors = [];
  
  if (!isValidName(user.name)) {
    errors.push('Name must be between 1 and 100 characters');
  }
  
  if (!isValidEmail(user.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (user.password && !isStrongPassword(user.password)) {
    errors.push('Password must be at least 6 characters with one uppercase letter and one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const normalizeTransaction = (transaction) => {
  return {
    ...transaction,
    name: sanitizeString(transaction.name),
    category: sanitizeString(transaction.category),
    originalCurrency: transaction.originalCurrency?.toUpperCase() || 'USD',
    amount: parseFloat(transaction.amount),
    originalAmount: parseFloat(transaction.originalAmount),
    isLiked: transaction.isLiked === true || transaction.isLiked === 'true'
  };
};

export const normalizeUser = (user) => {
  return {
    ...user,
    name: sanitizeString(user.name),
    email: user.email?.toLowerCase().trim(),
    password: user.password
  };
};