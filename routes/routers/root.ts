// Imports
import faults from "../../core/faults";

// Defines subroutes
const subroutes = [
    await import("./api"),
    await import("../services/assets"),
    await import("../services/static"),
    await import("../pages/home")
].map((imported) => imported.default);

// Defines route
export async function route(url: URL, request: Request, server: Bun.Server): Promise<Response> {
    // Attempts subroutes
    for(let i = 0; i < subroutes.length; i++) {
        try {
            const subroute = subroutes[i]!;
            const response = await subroute(url, request, server);
            return response;
        }
        catch(thrown) {
            if(thrown instanceof faults.RouteAbort) continue;
            throw thrown;
        }
    }
    throw new faults.MissingEndpoint();
}

// Exports
export default route;
