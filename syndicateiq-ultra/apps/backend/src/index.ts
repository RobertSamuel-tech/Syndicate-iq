import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import { config } from './config';
import { logger } from './lib/logger';
import { ingestRoutes } from './routes/ingest';

const server = Fastify({
  logger: logger,
});

async function start() {
  try {
    // Register plugins
    await server.register(cors, {
      origin: true,
    });

    await server.register(multipart, {
      limits: {
        fileSize: config.maxFileSize,
      },
    });

    await server.register(rateLimit, {
      max: 100,
      timeWindow: '1 minute',
    });

    // Register routes
    await server.register(ingestRoutes, { prefix: '/api' });

    // Health check
    server.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    // Start server
    const address = await server.listen({
      port: config.port,
      host: config.host,
    });

    logger.info(`Server listening on ${address}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

start();
