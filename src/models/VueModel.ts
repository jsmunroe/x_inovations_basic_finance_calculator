import * as quotesApi from '@/apis/quotesApi'

export interface FinanceQuoteModel {
  cost: number
  profit: number
  sellingPrice: number
  term: number
  rate: number
  outOfPocket: number
  taxRate: number
}

export interface ResultModel {
  taxes: number
  baseLoanAmount: number
  interest: number
  totalLoanAmount: number
  payment: number
  outOfPocket: number
  quoteName: string
}

export interface SavedQuoteModel {
  id: string
  financeQuote: FinanceQuoteModel
  result: ResultModel
}

export interface VueModel {
  id: string | null,
  financeQuote: FinanceQuoteModel
  result: ResultModel

  savedQuotes: SavedQuoteModel[]
}

export function createFinanceQuoteModel(): FinanceQuoteModel {
  return {
    cost: 0,
    profit: 0,
    sellingPrice: 0,
    term: 0,
    rate: 0,
    outOfPocket: 0,
    taxRate: 0,
  };
}

export function createResultModel(): ResultModel {
  return {
    taxes: 0,
    baseLoanAmount: 0,
    interest: 0,
    totalLoanAmount: 0,
    payment: 0,
    outOfPocket: 0,
    quoteName: '',
  };
}

export function createVueModel(): VueModel {
  return {
    id: null,
    financeQuote: {
      cost: 0,
      profit: 0,
      sellingPrice: 0,
      term: 0,
      rate: 0,
      outOfPocket: 0,
      taxRate: 0,
    },
    result: {
      taxes: 0,
      baseLoanAmount: 0,
      interest: 0,
      totalLoanAmount: 0,
      payment: 0,
      outOfPocket: 0,
      quoteName: '',
    },
    savedQuotes: [],
  }
}

export function saveVueModel(vueModel: VueModel): void {
  // Keep localStorage for temporary state persistence
  localStorage.setItem('financeCalculatorModel', JSON.stringify(vueModel));
}

export async function loadVueModel(): Promise<VueModel> {
  // Load from localStorage first for current state
  const savedQuotesJson = localStorage.getItem('financeCalculatorModel');
  const vueModel: VueModel = savedQuotesJson ? JSON.parse(savedQuotesJson) : createVueModel();

  // Load saved quotes from API
  try {
    const savedQuotes = await quotesApi.loadQuotes();
    vueModel.savedQuotes = savedQuotes;
  } catch (error) {
    console.error('Failed to load quotes from API:', error);
    // Fall back to empty array if API fails
    vueModel.savedQuotes = [];
  }

  return vueModel;
}

export function updateFinanceQuoteByCost(financeQuote: FinanceQuoteModel, cost: number, ): FinanceQuoteModel {
  const sellingPrice = cost + financeQuote.profit;

  return {... financeQuote, cost, sellingPrice };
}

export function updateFinanceQuoteByProfit(financeQuote: FinanceQuoteModel, profit: number,): FinanceQuoteModel {
  const sellingPrice = financeQuote.cost + profit;

  return {... financeQuote, profit, sellingPrice };
}

export function updateFinanceQuoteBySellingPrice(financeQuote: FinanceQuoteModel, sellingPrice: number,): FinanceQuoteModel {
  const profit = sellingPrice - financeQuote.cost;

  return {... financeQuote, sellingPrice, profit };
}

export function computeResult(financeQuote: FinanceQuoteModel): ResultModel {
  const taxes = financeQuote.sellingPrice * (financeQuote.taxRate / 100);
  const baseLoanAmount = financeQuote.sellingPrice + taxes;
  const interest = baseLoanAmount * (financeQuote.rate / 100);
  const totalLoanAmount = baseLoanAmount + interest - financeQuote.outOfPocket;
  const payment = financeQuote.term === 0 ? 0 : totalLoanAmount / financeQuote.term;
  const outOfPocket = financeQuote.outOfPocket;

  return {
    taxes,
    baseLoanAmount,
    interest,
    totalLoanAmount,
    payment,
    outOfPocket,
    quoteName: '',
  }
}

export async function saveQuote(vueModel: VueModel, quoteName: string): Promise<SavedQuoteModel> {
  // Set the quote name
  vueModel.result.quoteName = quoteName;

  if (vueModel.id) {
    // Update existing quote
    try {
      const updatedQuote = await quotesApi.updateQuote(vueModel.id, vueModel);

      // Update local savedQuotes array
      const existingQuoteIndex = vueModel.savedQuotes.findIndex(quote => quote.id === vueModel.id);
      if (existingQuoteIndex !== -1) {
        vueModel.savedQuotes[existingQuoteIndex] = updatedQuote;
      }

      return updatedQuote;
    } catch (error) {
      console.error('Failed to update quote:', error);
      throw error;
    }
  } else {
    // Create new quote
    try {
      const newQuote = await quotesApi.saveQuote(vueModel);

      // Add to local savedQuotes array
      vueModel.savedQuotes.push(newQuote);

      return newQuote;
    } catch (error) {
      console.error('Failed to save quote:', error);
      throw error;
    }
  }
}

export async function deleteQuote(vueModel: VueModel, id: string): Promise<void> {
  try {
    await quotesApi.deleteQuote(id);

    // Remove from local savedQuotes array
    vueModel.savedQuotes = vueModel.savedQuotes.filter(quote => quote.id !== id);
  } catch (error) {
    console.error('Failed to delete quote:', error);
    throw error;
  }
}
