import type { VueModel, SavedQuoteModel } from "@/models/VueModel";

const API_BASE_URL = 'http://localhost:3001/api';

// API functions for quotes
export async function saveQuote(vueModel: VueModel): Promise<SavedQuoteModel> {
  const response = await fetch(`${API_BASE_URL}/quotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: vueModel.result.quoteName,
      financeQuote: vueModel.financeQuote,
      result: {
        taxes: vueModel.result.taxes,
        baseLoanAmount: vueModel.result.baseLoanAmount,
        interest: vueModel.result.interest,
        totalLoanAmount: vueModel.result.totalLoanAmount,
        payment: vueModel.result.payment,
        outOfPocket: vueModel.result.outOfPocket
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to save quote: ${response.statusText}`);
  }

  return response.json();
}

export async function loadQuotes(): Promise<SavedQuoteModel[]> {
  const response = await fetch(`${API_BASE_URL}/quotes`);

  if (!response.ok) {
    throw new Error(`Failed to load quotes: ${response.statusText}`);
  }

  return response.json();
}

export async function updateQuote(id: string, vueModel: VueModel): Promise<SavedQuoteModel> {
  const response = await fetch(`${API_BASE_URL}/quotes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: vueModel.result.quoteName,
      financeQuote: vueModel.financeQuote,
      result: {
        taxes: vueModel.result.taxes,
        baseLoanAmount: vueModel.result.baseLoanAmount,
        interest: vueModel.result.interest,
        totalLoanAmount: vueModel.result.totalLoanAmount,
        payment: vueModel.result.payment,
        outOfPocket: vueModel.result.outOfPocket
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to update quote: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteQuote(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/quotes/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete quote: ${response.statusText}`);
  }
}

export async function getQuote(id: string): Promise<SavedQuoteModel> {
  const response = await fetch(`${API_BASE_URL}/quotes/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to get quote: ${response.statusText}`);
  }

  return response.json();
}
