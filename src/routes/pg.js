/**
 * @param {import('fastify').FastifyInstance} fastify
 */
module.exports = async function (fastify) {
  fastify.get('/api/pg/resources', async () => {
    return { message: 'PostgreSQL endpoint works' };
  });
};
