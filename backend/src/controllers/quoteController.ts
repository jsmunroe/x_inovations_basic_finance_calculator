import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { computeResult } from '../utils/calculations.js';

// Validation schemas
const financeQuoteSchema = z.object({
  cost: z.number().min(0),
  profit: z.number().min(0),
  sellingPrice: z.number().min(0),
  term: z.number().min(0),
  rate: z.number().min(0),
  outOfPocket: z.number().min(0),
  taxRate: z.number().min(0)
});

const resultSchema = z.object({
  taxes: z.number(),
  baseLoanAmount: z.number(),
  interest: z.number(),
  totalLoanAmount: z.number(),
  payment: z.number(),
  outOfPocket: z.number()
});

const createQuoteSchema = z.object({
  name: z.string().min(1),
  financeQuote: financeQuoteSchema,
  result: resultSchema
});

const updateQuoteSchema = z.object({
  name: z.string().min(1).optional(),
  financeQuote: financeQuoteSchema.optional(),
  result: resultSchema.optional()
});

export async function createQuote(req: Request, res: Response): Promise<Response> {
  const validatedData = createQuoteSchema.parse(req.body);

  // Verify calculations
  const calculatedResult = computeResult(validatedData.financeQuote);

  const quote = await prisma.quote.create({
    data: {
      name: validatedData.name,
      cost: validatedData.financeQuote.cost,
      profit: validatedData.financeQuote.profit,
      sellingPrice: validatedData.financeQuote.sellingPrice,
      term: validatedData.financeQuote.term,
      rate: validatedData.financeQuote.rate,
      outOfPocket: validatedData.financeQuote.outOfPocket,
      taxRate: validatedData.financeQuote.taxRate,
      taxes: calculatedResult.taxes,
      baseLoanAmount: calculatedResult.baseLoanAmount,
      interest: calculatedResult.interest,
      totalLoanAmount: calculatedResult.totalLoanAmount,
      payment: calculatedResult.payment,
    }
  });

  // Format response to match frontend model
  const response = {
    id: quote.id,
    financeQuote: {
      cost: quote.cost,
      profit: quote.profit,
      sellingPrice: quote.sellingPrice,
      term: quote.term,
      rate: quote.rate,
      outOfPocket: quote.outOfPocket,
      taxRate: quote.taxRate
    },
    result: {
      taxes: quote.taxes,
      baseLoanAmount: quote.baseLoanAmount,
      interest: quote.interest,
      totalLoanAmount: quote.totalLoanAmount,
      payment: quote.payment,
      outOfPocket: quote.outOfPocket,
      quoteName: quote.name
    },
    createdAt: quote.createdAt,
    updatedAt: quote.updatedAt
  };

  return res.status(201).json(response);
}

export async function getQuotes(req: Request, res: Response): Promise<Response> {
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const response = quotes.map((quote: any) => ({
    id: quote.id,
    financeQuote: {
      cost: quote.cost,
      profit: quote.profit,
      sellingPrice: quote.sellingPrice,
      term: quote.term,
      rate: quote.rate,
      outOfPocket: quote.outOfPocket,
      taxRate: quote.taxRate
    },
    result: {
      taxes: quote.taxes,
      baseLoanAmount: quote.baseLoanAmount,
      interest: quote.interest,
      totalLoanAmount: quote.totalLoanAmount,
      payment: quote.payment,
      outOfPocket: quote.outOfPocket,
      quoteName: quote.name
    },
    createdAt: quote.createdAt,
    updatedAt: quote.updatedAt
  }));

  return res.json(response);
}

export async function getQuote(req: Request, res: Response): Promise<Response> {
  const quoteId = req.params.id;

  if (!quoteId) {
    return res.status(400).json({
      message: 'Quote ID is required',
      code: 'MISSING_QUOTE_ID'
    });
  }

  const quote = await prisma.quote.findUnique({
    where: { id: quoteId }
  });

  if (!quote) {
    return res.status(404).json({
      message: 'Quote not found',
      code: 'QUOTE_NOT_FOUND'
    });
  }

  const response = {
    id: quote.id,
    financeQuote: {
      cost: quote.cost,
      profit: quote.profit,
      sellingPrice: quote.sellingPrice,
      term: quote.term,
      rate: quote.rate,
      outOfPocket: quote.outOfPocket,
      taxRate: quote.taxRate
    },
    result: {
      taxes: quote.taxes,
      baseLoanAmount: quote.baseLoanAmount,
      interest: quote.interest,
      totalLoanAmount: quote.totalLoanAmount,
      payment: quote.payment,
      outOfPocket: quote.outOfPocket,
      quoteName: quote.name
    },
    createdAt: quote.createdAt,
    updatedAt: quote.updatedAt
  };

  return res.json(response);
}

export async function updateQuote(req: Request, res: Response): Promise<Response> {
  const quoteId = req.params.id;
  const validatedData = updateQuoteSchema.parse(req.body);

  if (!quoteId) {
    return res.status(400).json({
      message: 'Quote ID is required',
      code: 'MISSING_QUOTE_ID'
    });
  }

  const existingQuote = await prisma.quote.findUnique({
    where: { id: quoteId }
  });

  if (!existingQuote) {
    return res.status(404).json({
      message: 'Quote not found',
      code: 'QUOTE_NOT_FOUND'
    });
  }

  let updateData: Record<string, unknown> = {};

  if (validatedData.name) {
    updateData.name = validatedData.name;
  }

  if (validatedData.financeQuote) {
    const calculatedResult = computeResult(validatedData.financeQuote);

    updateData = {
      ...updateData,
      cost: validatedData.financeQuote.cost,
      profit: validatedData.financeQuote.profit,
      sellingPrice: validatedData.financeQuote.sellingPrice,
      term: validatedData.financeQuote.term,
      rate: validatedData.financeQuote.rate,
      outOfPocket: validatedData.financeQuote.outOfPocket,
      taxRate: validatedData.financeQuote.taxRate,
      taxes: calculatedResult.taxes,
      baseLoanAmount: calculatedResult.baseLoanAmount,
      interest: calculatedResult.interest,
      totalLoanAmount: calculatedResult.totalLoanAmount,
      payment: calculatedResult.payment,
    };
  }

  const quote = await prisma.quote.update({
    where: { id: quoteId },
    data: updateData
  });

  const response = {
    id: quote.id,
    financeQuote: {
      cost: quote.cost,
      profit: quote.profit,
      sellingPrice: quote.sellingPrice,
      term: quote.term,
      rate: quote.rate,
      outOfPocket: quote.outOfPocket,
      taxRate: quote.taxRate
    },
    result: {
      taxes: quote.taxes,
      baseLoanAmount: quote.baseLoanAmount,
      interest: quote.interest,
      totalLoanAmount: quote.totalLoanAmount,
      payment: quote.payment,
      outOfPocket: quote.outOfPocket,
      quoteName: quote.name
    },
    createdAt: quote.createdAt,
    updatedAt: quote.updatedAt
  };

  return res.json(response);
}

export async function deleteQuote(req: Request, res: Response): Promise<Response> {
  const quoteId = req.params.id;

  if (!quoteId) {
    return res.status(400).json({
      message: 'Quote ID is required',
      code: 'MISSING_QUOTE_ID'
    });
  }

  const existingQuote = await prisma.quote.findUnique({
    where: { id: quoteId }
  });

  if (!existingQuote) {
    return res.status(404).json({
      message: 'Quote not found',
      code: 'QUOTE_NOT_FOUND'
    });
  }

  await prisma.quote.delete({
    where: { id: quoteId }
  });

  return res.status(204).send();
}
