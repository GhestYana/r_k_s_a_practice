const pool = require('../db/postgres');

const pgRoutes = async (fastify) => {

  fastify.get('/api/pg/resources', async (request, reply) => {
    const result = await pool.query('SELECT * FROM resources');
    return result.rows;
  });

  fastify.post('/api/pg/resources', async (request, reply) => {
    const { name, description } = request.body;
    if (!name) return reply.status(400).send({ error: 'Name is required' });

    const result = await pool.query(
      'INSERT INTO resources (name, description) VALUES ($1, $2) RETURNING *',
      [name, description || null]
    );
    return result.rows[0];
  });

};

module.exports = pgRoutes;
