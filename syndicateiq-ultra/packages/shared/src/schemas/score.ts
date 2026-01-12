import { z } from 'zod';

export const RiskScoreRequestSchema = z.object({
  documentId: z.string(),
  claims: z.array(z.any()),
  confidenceScores: z.record(z.number()),
  industry: z.string().optional(),
  jurisdiction: z.string().optional(),
});

export const RiskScoreResponseSchema = z.object({
  documentId: z.string(),
  score: z.number().min(0).max(100),
  weightBreakdown: z.record(z.number()),
  explanationTree: z.record(z.unknown()),
  industry: z.string().optional(),
  jurisdiction: z.string().optional(),
});

export type RiskScoreRequest = z.infer<typeof RiskScoreRequestSchema>;
export type RiskScoreResponse = z.infer<typeof RiskScoreResponseSchema>;
