// Imports
import nodePath from "node:path";
import direct from "../../core/direct";
import faults from "../../core/faults";

// Defines route
export async function route(server: Bun.Server, request: Request, url: URL): Promise<Response> {
    // Checks pathname
    const pattern = url.pathname.match(/^\/assets\/(.*)$/);
    if(pattern === null) throw new faults.RouteAbort();

    // Returns asset
    const file = await grab.resolveFile(pattern[1]!, paths.assets);
    if(file === null) throw new faults.MissingAsset();
    return pack.resolveFile(file);
}

// Exports
export default route;
