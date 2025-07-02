// Imports
import nodePath from "node:path";
import direct from "../bunsvr/direct";
import faults from "../bunsvr/report";

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Checks pathname
    if(url.pathname !== "/") throw new faults.RouteAbort();

    // Returns page
    const filepath = nodePath.resolve(direct.root, "./assets/html/index.html");
    const file = Bun.file(filepath);
    return new Response(file);
}

// Exports
export default route;
