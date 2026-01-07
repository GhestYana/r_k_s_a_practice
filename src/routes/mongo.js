const { connect } = require('../db/mongo');

const mongoRoutes = async (fastify) => {

  fastify.get('/mongo/resources', async (request, reply) => {
    const db = await connect();
    const resources = await db.collection('resources').find().toArray();
    return resources;
  });

  fastify.post('/mongo/resources', async (request, reply) => {
    const { name, description } = request.body;
    if (!name) return reply.status(400).send({ error: 'Name is required' });

    const db = await connect();
    const result = await db.collection('resources').insertOne({ name, description });
    return result.ops[0];
  });

};

module.exports = mongoRoutes;
