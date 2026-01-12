import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',
  databaseUrl: process.env.DATABASE_URL || '',
  redisUrl: process.env.REDIS_URL,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  logLevel: process.env.LOG_LEVEL || 'info',
  logFormat: process.env.LOG_FORMAT || 'json',
  jwtSecret: process.env.JWT_SECRET || '',
  apiKey: process.env.API_KEY || '',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800', 10),
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  enableOcr: process.env.ENABLE_OCR === 'true',
  enableMultilingual: process.env.ENABLE_MULTILINGUAL === 'true',
  enableFeedbackLearning: process.env.ENABLE_FEEDBACK_LEARNING === 'true',
} as const;
