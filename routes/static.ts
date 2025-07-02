// Imports
import direct from "../bunsvr/direct";
import report from "../bunsvr/report";
import grabFile from "../library/grabFile";

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Checks pathname
    const pattern = url.pathname.match(/^\/(.*)$/);
    if(pattern === null) throw new report.RouteAbort();

    // Grabs file
    try {
        const file = await grabFile(pattern[1]!, direct.contents);
        return new Response(file, {
            headers: {
                "cache-control": "max-age=86400"
            }
        });
    }
    catch {
        throw new report.RouteAbort();
    }
}

// Exports
export default route;
