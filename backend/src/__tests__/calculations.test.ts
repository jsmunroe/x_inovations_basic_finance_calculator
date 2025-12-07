import { describe, it, expect } from 'vitest';
import { computeResult } from '../utils/calculations';

describe('Calculations Utils', () => {
  describe('computeResult', () => {
    it('should calculate finance results correctly', () => {
      const financeQuote = {
        cost: 10000,
        profit: 2000,
        sellingPrice: 15000,
        term: 60,
        rate: 0.05,
        outOfPocket: 2000,
        taxRate: 0.08,
      };

      const result = computeResult(financeQuote);

      expect(result).toHaveProperty('taxes');
      expect(result).toHaveProperty('baseLoanAmount');
      expect(result).toHaveProperty('interest');
      expect(result).toHaveProperty('totalLoanAmount');
      expect(result).toHaveProperty('payment');
      expect(result).toHaveProperty('outOfPocket');

      // Basic validation of calculated values
      expect(result.taxes).toBeGreaterThanOrEqual(0);
      expect(result.baseLoanAmount).toBeGreaterThanOrEqual(0);
      expect(result.interest).toBeGreaterThanOrEqual(0);
      expect(result.totalLoanAmount).toBeGreaterThanOrEqual(0);
      expect(result.payment).toBeGreaterThanOrEqual(0);
      expect(result.outOfPocket).toEqual(financeQuote.outOfPocket);
    });

    it('should handle zero values correctly', () => {
      const financeQuote = {
        cost: 0,
        profit: 0,
        sellingPrice: 0,
        term: 12,
        rate: 0.05,
        outOfPocket: 0,
        taxRate: 0.08,
      };

      const result = computeResult(financeQuote);

      expect(result.taxes).toBe(0);
      expect(result.baseLoanAmount).toBe(0);
      expect(result.outOfPocket).toBe(0);
    });

    it('should handle high interest rates', () => {
      const financeQuote = {
        cost: 10000,
        profit: 2000,
        sellingPrice: 15000,
        term: 60,
        rate: 0.15, // High interest rate
        outOfPocket: 1000,
        taxRate: 0.08,
      };

      const result = computeResult(financeQuote);

      expect(result.interest).toBeGreaterThan(0);
      expect(result.payment).toBeGreaterThan(0);
      // Total loan amount should be positive
      expect(result.totalLoanAmount).toBeGreaterThan(0);
    });
  });
});
