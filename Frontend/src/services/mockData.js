export const transactionsMock = [
  {
    id: '1a',
    type: 'income', // 'income' ou 'expense'
    description: 'Salário Mensal',
    value: 3500.00,
    category: 'Trabalho',
    date: '2025-07-01',
  },
  {
    id: '2b',
    type: 'expense',
    description: 'Aluguel',
    value: 1200.00,
    category: 'Moradia',
    date: '2025-07-05',
  },
  {
    id: '3c',
    type: 'expense',
    description: 'Supermercado',
    value: 280.50,
    category: 'Alimentação',
    date: '2025-07-10',
  },
  {
    id: '4d',
    type: 'income',
    description: 'Freelance Design',
    value: 700.00,
    category: 'Trabalho',
    date: '2025-07-12',
  },
];

export const categoriesMock = [
    'Alimentação',
    'Moradia',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Trabalho',
    'Outros'
];