// Imports
import * as except from "./except";
import * as log from "./log";
import * as project from "./project";
import * as router from "./router";

// Creates server
const server = Bun.serve({
    development: project.debug,
    fetch: async (request: Request): Promise<Response> => {
        // Handles fetch
        try {
            // Handles inbound
            log.inbound(request);

            // Handles outbound
            const response = router.handle(request, server);
            log.outbound(response);
            return response;
        }
        catch(error) {
            // Handles error
            if(error instanceof except.Exception) log.exception(error);
            else if(error instanceof Error) log.error(error);
            else log.error(new Error(String(error)));

            // Handles outbound
            const exception = error instanceof except.Exception ?
                error :
                except.exceptions.UNKNOWN_EXCEPTION;
            const response = Response.json({
                code: exception.code,
                message: exception.message
            }, exception.status);
            log.outbound(response);
            return response;
        }
    },
    port: project.port
});
log.server(server);
