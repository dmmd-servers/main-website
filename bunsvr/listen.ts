// Defines server listener
export function listen(
    port: number,
    analyze: (request: Request) => Promise<Request>,
    route: (request: Request) => Promise<Response>,
    fix: (request: Request | null, thrown: unknown) => Promise<Response>,
    inspect: (request: Request | null, response: Response) => Promise<Response>
): Bun.Server {
    // Creates server
    const server = Bun.serve({
        development: false,
        error: async (thrown) => {
            // Resolves access
            const response = await fix(null, thrown);
            const outbound = await inspect(null, response);
            return outbound;
        },
        fetch: async (inbound) => {
            // Resolves access
            const request = await analyze(inbound);
            try {
                const response = await route(request);
                const outbound = await inspect(request, response);
                return outbound;
            }
            catch(thrown) {
                const response = await fix(request, thrown);
                const outbound = await inspect(request, response);
                return outbound;
            }
        },
        port: port
    });
    return server;
}

// Exports
export default listen;
