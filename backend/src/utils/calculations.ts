import { FinanceQuoteModel, ResultModel } from '../types/index.js';

export function computeResult(financeQuote: FinanceQuoteModel): Omit<ResultModel, 'quoteName'> {
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
  };
}
