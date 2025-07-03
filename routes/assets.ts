// Imports
import paths from "../library/paths";
import grab from "../library/grab";
import faults from "../library/faults";

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Checks pathname
    const pattern = url.pathname.match(/^\/assets\/(.*)$/);
    if(pattern === null) throw new faults.RouteAbort();

    // Grabs file
    try {
        const file = await grab.grabFile(pattern[1]!, paths.assets);
        return new Response(file, {
            headers: {
                "cache-control": "max-age=86400"
            }
        });
    }
    catch {
        throw new faults.MissingAsset();
    }
}

// Exports
export default route;
