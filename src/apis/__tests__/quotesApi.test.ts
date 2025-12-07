import { describe, it, expect, vi, beforeEach } from 'vitest'
import { saveQuote, loadQuotes, updateQuote, deleteQuote, getQuote } from '../quotesApi'
import type { VueModel } from '@/models/VueModel'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

const mockVueModel: VueModel = {
  id: null,
  financeQuote: {
    cost: 10000,
    profit: 2000,
    sellingPrice: 12000,
    term: 12,
    rate: 5.5,
    outOfPocket: 1000,
    taxRate: 8.25
  },
  result: {
    taxes: 990,
    baseLoanAmount: 12990,
    interest: 714.45,
    totalLoanAmount: 12704.45,
    payment: 1058.7,
    outOfPocket: 1000,
    quoteName: 'Test Quote'
  },
  savedQuotes: []
}

const mockSavedQuote = {
  id: 'quote-123',
  financeQuote: mockVueModel.financeQuote,
  result: mockVueModel.result,
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('quotesApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('saveQuote', () => {
    it('should save a quote successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSavedQuote)
      })

      const result = await saveQuote(mockVueModel)

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Test Quote',
          financeQuote: mockVueModel.financeQuote,
          result: {
            taxes: 990,
            baseLoanAmount: 12990,
            interest: 714.45,
            totalLoanAmount: 12704.45,
            payment: 1058.7,
            outOfPocket: 1000
          }
        })
      })

      expect(result).toEqual(mockSavedQuote)
    })

    it('should throw error when save fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request'
      })

      await expect(saveQuote(mockVueModel)).rejects.toThrow('Failed to save quote: Bad Request')
    })
  })

  describe('loadQuotes', () => {
    it('should load quotes successfully', async () => {
      const mockQuotes = [mockSavedQuote]
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockQuotes)
      })

      const result = await loadQuotes()

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/quotes')
      expect(result).toEqual(mockQuotes)
    })

    it('should throw error when load fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error'
      })

      await expect(loadQuotes()).rejects.toThrow('Failed to load quotes: Internal Server Error')
    })
  })

  describe('updateQuote', () => {
    it('should update a quote successfully', async () => {
      const updatedQuote = { ...mockSavedQuote, result: { ...mockSavedQuote.result, quoteName: 'Updated Quote' } }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(updatedQuote)
      })

      const result = await updateQuote('quote-123', mockVueModel)

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/quotes/quote-123', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Test Quote',
          financeQuote: mockVueModel.financeQuote,
          result: {
            taxes: 990,
            baseLoanAmount: 12990,
            interest: 714.45,
            totalLoanAmount: 12704.45,
            payment: 1058.7,
            outOfPocket: 1000
          }
        })
      })

      expect(result).toEqual(updatedQuote)
    })
  })

  describe('deleteQuote', () => {
    it('should delete a quote successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true
      })

      await deleteQuote('quote-123')

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/quotes/quote-123', {
        method: 'DELETE'
      })
    })

    it('should throw error when delete fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      })

      await expect(deleteQuote('quote-123')).rejects.toThrow('Failed to delete quote: Not Found')
    })
  })

  describe('getQuote', () => {
    it('should get a quote successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSavedQuote)
      })

      const result = await getQuote('quote-123')

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/quotes/quote-123')
      expect(result).toEqual(mockSavedQuote)
    })

    it('should throw error when get fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      })

      await expect(getQuote('quote-123')).rejects.toThrow('Failed to get quote: Not Found')
    })
  })
})
