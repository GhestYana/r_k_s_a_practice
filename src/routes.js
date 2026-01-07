/**
 * @param {import("fastify").FastifyInstance} fastify 
 */
const patchRouting = async (fastify) => {
  fastify.get('/hello', async (request, reply) => {
    return 'Hello World!'; 
  });
};

module.exports = { patchRouting };