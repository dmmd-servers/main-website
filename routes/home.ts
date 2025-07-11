// Imports
import grab from "../library/grab";
import pack from "../library/pack";
import faults from "../library/faults";
import paths from "../library/paths";

// Defines route
export async function route(server: Bun.Server, request: Request, url: URL): Promise<Response> {
    // Checks pathname
    if(url.pathname !== "/") throw new faults.RouteAbort();

    // Returns page
    const file = await grab.resolveFile("index.html", paths.resources);
    if(file === null) throw new faults.RouteAbort();
    return pack.resolveFile(file);
}

// Exports
export default route;
