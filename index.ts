// Imports
import listen from "./bunsvr/listen";
import pack from "./library/pack";
import inspect from "./library/inspect";
import project from "./library/project";
import router from "./library/router";

// Creates server
const server = listen(
    // Pre-processor
    async (server, request) => {
        const ping = inspect.inspectPing(server, request);
        return ping;
    },

    // Processor
    router,

    // Fixer
    async (server, request, thrown) => {
        const fault = inspect.inspectFault(server, request, thrown);
        const response = pack.resolveFault(fault);
        return response;
    },

    // Post-processor
    async (server, request, response) => {
        const access = inspect.inspectAccess(server, request, response);
        return access;
    },

    // Port
    project.port
);
inspect.inspectServer(server);
