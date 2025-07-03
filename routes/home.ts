// Imports
import nodePath from "node:path";
import faults from "../library/faults";
import paths from "../library/paths";

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Checks pathname
    if(url.pathname !== "/") throw new faults.RouteAbort();

    // Returns page
    const filepath = nodePath.resolve(paths.root, "./assets/html/index.html");
    const file = Bun.file(filepath);
    return new Response(file);
}

// Exports
export default route;
