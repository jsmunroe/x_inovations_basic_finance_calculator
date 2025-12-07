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

export interface VueModel {
  financeQuote: FinanceQuoteModel
  result: ResultModel
}

export function createVueModel(): VueModel {
  return {
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
  }
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
