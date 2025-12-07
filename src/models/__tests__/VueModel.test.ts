import { describe, it, expect } from 'vitest'
import {
  createFinanceQuoteModel,
  createResultModel,
  createVueModel,
  updateFinanceQuoteByCost,
  updateFinanceQuoteByProfit,
  updateFinanceQuoteBySellingPrice,
  computeResult
} from '../VueModel'

describe('VueModel', () => {
  describe('createFinanceQuoteModel', () => {
    it('should create a finance quote model with default values', () => {
      const model = createFinanceQuoteModel()

      expect(model).toEqual({
        cost: 0,
        profit: 0,
        sellingPrice: 0,
        term: 0,
        rate: 0,
        outOfPocket: 0,
        taxRate: 0,
      })
    })
  })

  describe('createResultModel', () => {
    it('should create a result model with default values', () => {
      const model = createResultModel()

      expect(model).toEqual({
        taxes: 0,
        baseLoanAmount: 0,
        interest: 0,
        totalLoanAmount: 0,
        payment: 0,
        outOfPocket: 0,
        quoteName: '',
      })
    })
  })

  describe('createVueModel', () => {
    it('should create a vue model with default values', () => {
      const model = createVueModel()

      expect(model).toEqual({
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
      })
    })
  })

  describe('updateFinanceQuoteByCost', () => {
    it('should update selling price when cost changes', () => {
      const initialQuote = {
        cost: 5000,
        profit: 2000,
        sellingPrice: 7000,
        term: 12,
        rate: 5.5,
        outOfPocket: 1000,
        taxRate: 8.25
      }

      const result = updateFinanceQuoteByCost(initialQuote, 6000)

      expect(result).toEqual({
        ...initialQuote,
        cost: 6000,
        sellingPrice: 8000, // 6000 + 2000
      })
    })
  })

  describe('updateFinanceQuoteByProfit', () => {
    it('should update selling price when profit changes', () => {
      const initialQuote = {
        cost: 5000,
        profit: 2000,
        sellingPrice: 7000,
        term: 12,
        rate: 5.5,
        outOfPocket: 1000,
        taxRate: 8.25
      }

      const result = updateFinanceQuoteByProfit(initialQuote, 2500)

      expect(result).toEqual({
        ...initialQuote,
        profit: 2500,
        sellingPrice: 7500, // 5000 + 2500
      })
    })
  })

  describe('updateFinanceQuoteBySellingPrice', () => {
    it('should update profit when selling price changes', () => {
      const initialQuote = {
        cost: 5000,
        profit: 2000,
        sellingPrice: 7000,
        term: 12,
        rate: 5.5,
        outOfPocket: 1000,
        taxRate: 8.25
      }

      const result = updateFinanceQuoteBySellingPrice(initialQuote, 8000)

      expect(result).toEqual({
        ...initialQuote,
        sellingPrice: 8000,
        profit: 3000, // 8000 - 5000
      })
    })
  })

  describe('computeResult', () => {
    it('should compute finance results correctly', () => {
      const financeQuote = {
        cost: 10000,
        profit: 2000,
        sellingPrice: 12000,
        term: 12,
        rate: 5.5,
        outOfPocket: 1000,
        taxRate: 8.25
      }

      const result = computeResult(financeQuote)

      expect(result.taxes).toBe(990) // 12000 * 0.0825
      expect(result.baseLoanAmount).toBe(12990) // 12000 + 990
      expect(result.interest).toBe(714.45) // 12990 * 0.055
      expect(result.totalLoanAmount).toBe(12704.45) // 12990 + 714.45 - 1000
      expect(result.payment).toBe(1058.7041666666667) // 12704.45 / 12
      expect(result.outOfPocket).toBe(1000)
    })

    it('should handle zero term', () => {
      const financeQuote = {
        cost: 10000,
        profit: 2000,
        sellingPrice: 12000,
        term: 0,
        rate: 5.5,
        outOfPocket: 1000,
        taxRate: 8.25
      }

      const result = computeResult(financeQuote)

      expect(result.payment).toBe(0)
    })

    it('should handle zero values', () => {
      const financeQuote = {
        cost: 0,
        profit: 0,
        sellingPrice: 0,
        term: 12,
        rate: 0,
        outOfPocket: 0,
        taxRate: 0
      }

      const result = computeResult(financeQuote)

      expect(result.taxes).toBe(0)
      expect(result.baseLoanAmount).toBe(0)
      expect(result.interest).toBe(0)
      expect(result.totalLoanAmount).toBe(0)
      expect(result.payment).toBe(0)
      expect(result.outOfPocket).toBe(0)
    })
  })
})
