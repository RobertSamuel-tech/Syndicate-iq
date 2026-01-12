import { z } from 'zod';

export const ExtractRequestSchema = z.object({
  documentId: z.string(),
  strategy: z.enum(['fast', 'ocr', 'multilingual', 'dual']).optional(),
});

export const ExtractResponseSchema = z.object({
  documentId: z.string(),
  extractedText: z.string(),
  confidence: z.number().min(0).max(1),
  strategy: z.string(),
  pageCount: z.number(),
});

export type ExtractRequest = z.infer<typeof ExtractRequestSchema>;
export type ExtractResponse = z.infer<typeof ExtractResponseSchema>;
