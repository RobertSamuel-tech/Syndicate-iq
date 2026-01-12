import { z } from 'zod';

export const ClaimSchema = z.object({
  claimText: z.string(),
  claimType: z.string(),
  severity: z.number().min(0).max(1),
  explanation: z.string().optional(),
  contradictions: z.array(z.string()).optional(),
});

export const ReasonRequestSchema = z.object({
  documentId: z.string(),
  normalizedMetrics: z.array(z.any()),
  extractedText: z.string(),
});

export const ReasonResponseSchema = z.object({
  documentId: z.string(),
  claims: z.array(ClaimSchema),
});

export type Claim = z.infer<typeof ClaimSchema>;
export type ReasonRequest = z.infer<typeof ReasonRequestSchema>;
export type ReasonResponse = z.infer<typeof ReasonResponseSchema>;
