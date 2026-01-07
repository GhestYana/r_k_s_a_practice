const Fastify = require("fastify");
require("dotenv").config();

const pgRoutes = require("./routes/pg");
const mongoRoutes = require("./routes/mongo");

const bootstrapFastify = () => {
  const fastify = Fastify({ logger: true });

  fastify.register(pgRoutes);
  fastify.register(mongoRoutes);

  return fastify;
};

module.exports = { bootstrapFastify };
