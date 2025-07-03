// Imports
import faults from "../library/faults";
import grab from "../library/grab";
import paths from "../library/paths";

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Checks pathname
    const pattern = url.pathname.match(/^\/(.*)$/);
    if(pattern === null) throw new faults.RouteAbort();

    // Grabs file
    try {
        const file = await grab.grabFile(pattern[1]!, paths.contents);
        return new Response(file, {
            headers: {
                "cache-control": "max-age=86400"
            }
        });
    }
    catch {
        throw new faults.RouteAbort();
    }
}

// Exports
export default route;
