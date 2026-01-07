const Fastify = require("fastify");
require("dotenv").config();
const path = require("path");

const { IS_DEV_ENV } = process.env;
const { patchRouting } = require("./routes");

const bootstrapFastify = () => {
    const fastify = Fastify({
        exposeHeadRoutes: false,
        connectionTimeout: 20000,
        ignoreTrailingSlash: false,
        logger: IS_DEV_ENV === "true"
            ? {
                level: "debug",
                transport: {
                    target: "@mgcrea/pino-pretty-compact",
                    options: {
                        colorize: true,
                        translateTime: "HH:MM:ss Z",
                        ignore: "pid,hostname"
                    }
                }
              }
            : false,
        disableRequestLogging: true,
    });

    // Статичні файли
    fastify.register(require("@fastify/static"), {
        root: path.join(__dirname, "../html"),
        prefix: "/",
    });

    // Роути
    fastify.register(patchRouting);

    if (IS_DEV_ENV === "true") {
        fastify.register(require("@mgcrea/fastify-request-logger"), {});
        fastify.ready(() => {
            console.log(`\nAPI Structure\n${fastify.printRoutes()}`);
        });
    }

    return fastify;
};

module.exports = { bootstrapFastify };
