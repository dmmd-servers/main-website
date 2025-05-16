// Imports
import * as audit from "./audit";
import * as except from "./except";
import * as project from "./project";
import * as router from "./router";

// Defines server
export const server = Bun.serve({
    development: project.debug,
    fetch: async (request: Request): Promise<Response> => {
        // Handles fetch
        try {
            // Handles route
            const url = new URL(request.url);
            for(let i = 0; i < router.routes.length; i++) {
                // Matches route
                const route = router.routes[i];
                if(typeof route === "undefined") continue;
                const match = typeof route.pattern === "string" ?
                    route.pattern === url.pathname :
                    route.pattern.test(url.pathname);
                if(!match) continue;
                
                // Resolves route
                const response = await route.resolve(request, server);
                audit.logFetch(request, response, server);
                return response;
            }
            throw new except.UnknownEndpoint();
        }
        catch(error) {
            // Handles exception
            const exception = error instanceof except.Exception ? error : new except.UnknownException();
            const response = Response.json({
                code: exception.code,
                message: exception.message
            }, exception.status);
            if(error instanceof except.Exception) audit.logException(exception); 
            else if(error instanceof Error) audit.logError(error);
            else audit.logError(new Error(String(error)));
            audit.logFetch(request, response, server);
            return response;
        }
    },
    port: project.port
});
audit.logServer(server);
