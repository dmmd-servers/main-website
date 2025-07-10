// Defines server listener
export function listen(
    preprocess: (server: Bun.Server, request: Request) => Request | Promise<Request>,
    process: (server: Bun.Server, request: Request) => Response | Promise<Response>,
    resolve: (server: Bun.Server, request: Request | null, thrown: unknown) => Response | Promise<Response>,
    postprocess: (server: Bun.Server, request: Request | null, response: Response) => Response | Promise<Response>,
    port: number
): Bun.Server {
    // Creates server
    const server = Bun.serve({
        development: false,
        error: async (thrown) => {
            // Resolves access
            const response = await resolve(server, null, thrown);
            const outbound = await postprocess(server, null, response);
            return outbound;
        },
        fetch: async (inbound) => {
            // Resolves access
            const request = await preprocess(server, inbound);
            try {
                const response = await process(server, request);
                const outbound = await postprocess(server, request, response);
                return outbound;
            }
            catch(thrown) {
                const response = await resolve(server, request, thrown);
                const outbound = await postprocess(server, request, response);
                return outbound;
            }
        },
        port: port
    });
    return server;
}

// Exports
export default listen;
