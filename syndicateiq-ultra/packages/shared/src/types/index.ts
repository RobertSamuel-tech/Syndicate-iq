// Common types used across the application

export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type ExtractionStrategy = 'fast' | 'ocr' | 'multilingual' | 'dual';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ProcessingPipeline {
  ingest: boolean;
  extract: boolean;
  normalize: boolean;
  reason: boolean;
  score: boolean;
}
