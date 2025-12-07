// Type definitions matching the Vue frontend models

export interface FinanceQuoteModel {
  cost: number;
  profit: number;
  sellingPrice: number;
  term: number;
  rate: number;
  outOfPocket: number;
  taxRate: number;
}

export interface ResultModel {
  taxes: number;
  baseLoanAmount: number;
  interest: number;
  totalLoanAmount: number;
  payment: number;
  outOfPocket: number;
  quoteName: string;
}

export interface SavedQuoteModel {
  id: string;
  financeQuote: FinanceQuoteModel;
  result: ResultModel;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export interface CreateQuoteRequest {
  name: string;
  financeQuote: FinanceQuoteModel;
  result: Omit<ResultModel, 'quoteName'>;
}

export interface UpdateQuoteRequest extends Partial<CreateQuoteRequest> {
  id: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown> | unknown[];
}
