import { z } from 'zod';

export const FeedbackRequestSchema = z.object({
  documentId: z.string(),
  originalScore: z.number(),
  correctedScore: z.number().optional(),
  outcomeLabel: z.string().optional(),
  userNotes: z.string().optional(),
});

export const FeedbackResponseSchema = z.object({
  feedbackId: z.string(),
  adjustmentSuggestions: z.array(z.string()).optional(),
});

export type FeedbackRequest = z.infer<typeof FeedbackRequestSchema>;
export type FeedbackResponse = z.infer<typeof FeedbackResponseSchema>;
