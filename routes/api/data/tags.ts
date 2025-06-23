// Imports
import faults from "../../../core/faults";
import tags from "../../../data/tags";

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Resolves data
    if(url.pathname !== "/api/data/tags") throw new faults.RouteAbort();
    return Response.json(tags, {
        headers: {
            "cache-control": "max-age=86400"
        }
    });
}

// Exports
export default route;
