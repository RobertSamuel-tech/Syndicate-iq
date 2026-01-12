import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ingestDocument } from '../services/ingest';

export async function ingestRoutes(fastify: FastifyInstance) {
  fastify.post('/ingest', async (request: FastifyRequest, reply: FastifyReply) => {
    // Placeholder - will be implemented in Phase 1
    return { message: 'Ingestion endpoint - Phase 1 implementation pending' };
  });
}
