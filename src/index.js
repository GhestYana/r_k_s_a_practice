const { bootstrapFastify } = require("./app");
const PORT = process.env.PORT || 3000;

const start = async () => {
    const app = bootstrapFastify();
    try {
        await app.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`Fastify server running on port ${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
