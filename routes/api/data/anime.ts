// Imports
import faults from "../../../core/faults";
import anime from "../../../data/anime";

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Resolves data
    if(url.pathname !== "/api/data/anime") throw new faults.RouteAbort();
    return Response.json(anime, {
        headers: {
            "cache-control": "max-age=86400"
        }
    });
}

// Exports
export default route;
