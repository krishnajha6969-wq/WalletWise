// Mock data layer — enables full app functionality without backend

const MOCK_USER = {
  id: 1,
  name: 'Alex Johnson',
  email: 'alex@walletwise.com',
  createdAt: '2024-01-15',
};

const MOCK_CATEGORIES = [
  { id: 1, name: 'Food & Dining', type: 'expense', icon: '🍔', userId: null },
  { id: 2, name: 'Transportation', type: 'expense', icon: '🚗', userId: null },
  { id: 3, name: 'Shopping', type: 'expense', icon: '🛍️', userId: null },
  { id: 4, name: 'Entertainment', type: 'expense', icon: '🎬', userId: null },
  { id: 5, name: 'Bills & Utilities', type: 'expense', icon: '💡', userId: null },
  { id: 6, name: 'Healthcare', type: 'expense', icon: '🏥', userId: null },
  { id: 7, name: 'Education', type: 'expense', icon: '📚', userId: null },
  { id: 8, name: 'Rent', type: 'expense', icon: '🏠', userId: null },
  { id: 9, name: 'Travel', type: 'expense', icon: '✈️', userId: null },
  { id: 10, name: 'Other Expense', type: 'expense', icon: '📦', userId: null },
  { id: 11, name: 'Salary', type: 'income', icon: '💰', userId: null },
  { id: 12, name: 'Freelance', type: 'income', icon: '💻', userId: null },
  { id: 13, name: 'Investments', type: 'income', icon: '📈', userId: null },
  { id: 14, name: 'Gifts', type: 'income', icon: '🎁', userId: null },
  { id: 15, name: 'Other Income', type: 'income', icon: '💵', userId: null },
];

let mockTransactions = [
  { id: 1, amount: 5200, type: 'income', description: 'Monthly Salary', date: '2026-04-01', categoryId: 11, userId: 1, category: MOCK_CATEGORIES[10] },
  { id: 2, amount: 1200, type: 'expense', description: 'Apartment Rent', date: '2026-04-01', categoryId: 8, userId: 1, category: MOCK_CATEGORIES[7] },
  { id: 3, amount: 85.50, type: 'expense', description: 'Grocery Shopping', date: '2026-04-02', categoryId: 1, userId: 1, category: MOCK_CATEGORIES[0] },
  { id: 4, amount: 45.00, type: 'expense', description: 'Gas Station', date: '2026-04-03', categoryId: 2, userId: 1, category: MOCK_CATEGORIES[1] },
  { id: 5, amount: 800, type: 'income', description: 'Freelance Project', date: '2026-04-04', categoryId: 12, userId: 1, category: MOCK_CATEGORIES[11] },
  { id: 6, amount: 32.99, type: 'expense', description: 'Netflix & Spotify', date: '2026-04-05', categoryId: 4, userId: 1, category: MOCK_CATEGORIES[3] },
  { id: 7, amount: 120, type: 'expense', description: 'New Shoes', date: '2026-04-06', categoryId: 3, userId: 1, category: MOCK_CATEGORIES[2] },
  { id: 8, amount: 150, type: 'expense', description: 'Electric Bill', date: '2026-04-07', categoryId: 5, userId: 1, category: MOCK_CATEGORIES[4] },
  { id: 9, amount: 65, type: 'expense', description: 'Doctor Visit', date: '2026-04-08', categoryId: 6, userId: 1, category: MOCK_CATEGORIES[5] },
  { id: 10, amount: 250, type: 'income', description: 'Investment Dividends', date: '2026-04-09', categoryId: 13, userId: 1, category: MOCK_CATEGORIES[12] },
  { id: 11, amount: 42.50, type: 'expense', description: 'Dinner Out', date: '2026-04-10', categoryId: 1, userId: 1, category: MOCK_CATEGORIES[0] },
  { id: 12, amount: 200, type: 'expense', description: 'Online Course', date: '2026-04-11', categoryId: 7, userId: 1, category: MOCK_CATEGORIES[6] },
  { id: 13, amount: 5200, type: 'income', description: 'Monthly Salary', date: '2026-03-01', categoryId: 11, userId: 1, category: MOCK_CATEGORIES[10] },
  { id: 14, amount: 1200, type: 'expense', description: 'Apartment Rent', date: '2026-03-01', categoryId: 8, userId: 1, category: MOCK_CATEGORIES[7] },
  { id: 15, amount: 310, type: 'expense', description: 'Groceries', date: '2026-03-05', categoryId: 1, userId: 1, category: MOCK_CATEGORIES[0] },
  { id: 16, amount: 600, type: 'income', description: 'Side Project', date: '2026-03-10', categoryId: 12, userId: 1, category: MOCK_CATEGORIES[11] },
  { id: 17, amount: 5000, type: 'income', description: 'Salary', date: '2026-02-01', categoryId: 11, userId: 1, category: MOCK_CATEGORIES[10] },
  { id: 18, amount: 1200, type: 'expense', description: 'Rent', date: '2026-02-01', categoryId: 8, userId: 1, category: MOCK_CATEGORIES[7] },
  { id: 19, amount: 450, type: 'expense', description: 'Travel Tickets', date: '2026-02-15', categoryId: 9, userId: 1, category: MOCK_CATEGORIES[8] },
  { id: 20, amount: 5000, type: 'income', description: 'Salary', date: '2026-01-01', categoryId: 11, userId: 1, category: MOCK_CATEGORIES[10] },
  { id: 21, amount: 1200, type: 'expense', description: 'Rent', date: '2026-01-01', categoryId: 8, userId: 1, category: MOCK_CATEGORIES[7] },
  { id: 22, amount: 180, type: 'expense', description: 'Shopping Mall', date: '2026-01-20', categoryId: 3, userId: 1, category: MOCK_CATEGORIES[2] },
];

let mockBudgets = [
  { id: 1, amount: 400, spent: 128, month: 4, year: 2026, categoryId: 1, userId: 1, category: MOCK_CATEGORIES[0] },
  { id: 2, amount: 1300, spent: 1200, month: 4, year: 2026, categoryId: 8, userId: 1, category: MOCK_CATEGORIES[7] },
  { id: 3, amount: 100, spent: 45, month: 4, year: 2026, categoryId: 2, userId: 1, category: MOCK_CATEGORIES[1] },
  { id: 4, amount: 50, spent: 32.99, month: 4, year: 2026, categoryId: 4, userId: 1, category: MOCK_CATEGORIES[3] },
  { id: 5, amount: 200, spent: 150, month: 4, year: 2026, categoryId: 5, userId: 1, category: MOCK_CATEGORIES[4] },
  { id: 6, amount: 150, spent: 120, month: 4, year: 2026, categoryId: 3, userId: 1, category: MOCK_CATEGORIES[2] },
];

let nextTxId = 30;
let nextBudgetId = 10;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const mockApi = {
  // Auth
  login: async () => {
    await delay(600);
    return { user: MOCK_USER, token: 'mock_jwt_token_walletwise_2026' };
  },

  register: async (name, email) => {
    await delay(600);
    return { user: { ...MOCK_USER, name, email }, token: 'mock_jwt_token_walletwise_2026' };
  },

  getMe: async () => {
    await delay(200);
    return { user: MOCK_USER };
  },

  // Categories
  getCategories: async () => {
    await delay(200);
    return { categories: MOCK_CATEGORIES };
  },

  // Transactions
  getTransactions: async ({ type, startDate, endDate, page = 1, limit = 15 } = {}) => {
    await delay(400);
    let filtered = [...mockTransactions];
    if (type) filtered = filtered.filter((t) => t.type === type);
    if (startDate) filtered = filtered.filter((t) => t.date >= startDate);
    if (endDate) filtered = filtered.filter((t) => t.date <= endDate);
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    const start = (page - 1) * limit;
    return {
      transactions: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  createTransaction: async (data) => {
    await delay(400);
    const tx = {
      id: nextTxId++,
      ...data,
      userId: 1,
      category: MOCK_CATEGORIES.find((c) => c.id === parseInt(data.categoryId)),
    };
    mockTransactions.unshift(tx);
    return { transaction: tx };
  },

  updateTransaction: async (id, data) => {
    await delay(400);
    const idx = mockTransactions.findIndex((t) => t.id === parseInt(id));
    if (idx >= 0) {
      mockTransactions[idx] = {
        ...mockTransactions[idx],
        ...data,
        category: MOCK_CATEGORIES.find((c) => c.id === parseInt(data.categoryId)),
      };
      return { transaction: mockTransactions[idx] };
    }
    throw new Error('Not found');
  },

  deleteTransaction: async (id) => {
    await delay(300);
    mockTransactions = mockTransactions.filter((t) => t.id !== parseInt(id));
    return { message: 'Deleted' };
  },

  // Budgets
  getBudgets: async ({ month, year } = {}) => {
    await delay(400);
    let filtered = [...mockBudgets];
    if (month) filtered = filtered.filter((b) => b.month === parseInt(month));
    if (year) filtered = filtered.filter((b) => b.year === parseInt(year));
    return { budgets: filtered };
  },

  createBudget: async (data) => {
    await delay(400);
    const budget = {
      id: nextBudgetId++,
      ...data,
      spent: 0,
      userId: 1,
      category: MOCK_CATEGORIES.find((c) => c.id === parseInt(data.categoryId)),
    };
    mockBudgets.push(budget);
    return { budget };
  },

  updateBudget: async (id, data) => {
    await delay(400);
    const idx = mockBudgets.findIndex((b) => b.id === parseInt(id));
    if (idx >= 0) {
      mockBudgets[idx] = { ...mockBudgets[idx], ...data };
      return { budget: mockBudgets[idx] };
    }
    throw new Error('Not found');
  },

  deleteBudget: async (id) => {
    await delay(300);
    mockBudgets = mockBudgets.filter((b) => b.id !== parseInt(id));
    return { message: 'Deleted' };
  },

  // Reports
  getMonthlySummary: async (year) => {
    await delay(400);
    const months = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, income: 0, expense: 0 }));
    mockTransactions
      .filter((t) => new Date(t.date).getFullYear() === parseInt(year))
      .forEach((t) => {
        const m = new Date(t.date).getMonth();
        months[m][t.type] += parseFloat(t.amount);
      });
    return { year: parseInt(year), data: months };
  },

  getCategoryBreakdown: async ({ year, type = 'expense' } = {}) => {
    await delay(400);
    const map = {};
    mockTransactions
      .filter((t) => t.type === type && (!year || new Date(t.date).getFullYear() === parseInt(year)))
      .forEach((t) => {
        if (!map[t.categoryId]) {
          map[t.categoryId] = { categoryId: t.categoryId, total: 0, count: 0, category: t.category };
        }
        map[t.categoryId].total += parseFloat(t.amount);
        map[t.categoryId].count++;
      });
    const breakdown = Object.values(map).sort((a, b) => b.total - a.total);
    return { breakdown };
  },
};
