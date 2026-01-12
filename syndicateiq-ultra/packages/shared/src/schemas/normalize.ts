import { z } from 'zod';

export const NormalizedMetricSchema = z.object({
  metricId: z.string(),
  value: z.number(),
  unit: z.string(),
  baseline: z.number().optional(),
  confidence: z.number().min(0).max(1),
  sourcePage: z.number().optional(),
});

export const NormalizeRequestSchema = z.object({
  documentId: z.string(),
  extractedText: z.string(),
});

export const NormalizeResponseSchema = z.object({
  documentId: z.string(),
  metrics: z.array(NormalizedMetricSchema),
});

export type NormalizedMetric = z.infer<typeof NormalizedMetricSchema>;
export type NormalizeRequest = z.infer<typeof NormalizeRequestSchema>;
export type NormalizeResponse = z.infer<typeof NormalizeResponseSchema>;
