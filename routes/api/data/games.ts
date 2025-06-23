// Imports
import faults from "../../../core/faults";
import games from "../../../data/games";

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Resolves data
    if(url.pathname !== "/api/data/games") throw new faults.RouteAbort();
    return Response.json(games, {
        headers: {
            "cache-control": "max-age=86400"
        }
    });
}

// Exports
export default route;
