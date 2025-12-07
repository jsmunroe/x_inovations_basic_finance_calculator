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

export const createVueModel = (): VueModel => ({
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
})
