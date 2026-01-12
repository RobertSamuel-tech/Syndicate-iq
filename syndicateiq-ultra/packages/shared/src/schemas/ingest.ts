import { z } from 'zod';

export const DocumentFingerprintSchema = z.object({
  fileHash: z.string(),
  filename: z.string(),
  fileSize: z.number(),
  mimeType: z.string(),
  pageCount: z.number().optional(),
  language: z.string().optional(),
  tableDensity: z.number().optional(),
  entropy: z.number().optional(),
  complexityScore: z.number().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const IngestResponseSchema = z.object({
  documentId: z.string(),
  fingerprint: DocumentFingerprintSchema,
  status: z.enum(['pending', 'processing', 'completed', 'failed']),
});

export type DocumentFingerprint = z.infer<typeof DocumentFingerprintSchema>;
export type IngestResponse = z.infer<typeof IngestResponseSchema>;
