// Imports
import faults from "../../core/faults";

// Defines subroutes
const subroutes = [
<<<<<<< HEAD:routes/routers/root.ts
    await import("./api"),
    await import("../services/assets"),
    await import("../services/static"),
    await import("../pages/home")
=======
    await import("./resources"),
    await import("./home")
>>>>>>> 5ea9a0a0822ce2c0bde0dcdefbd448528b5e70f9:routes/root.ts
].map((imported) => imported.default);

// Defines route
export async function route(server: Bun.Server, request: Request): Promise<Response> {
    // Resolves subroutes
    const url = new URL(request.url);
    for(let i = 0; i < subroutes.length; i++) {
        try {
            const subroute = subroutes[i]!;
            const response = await subroute(server, request, url);
            return response;
        }
        catch(thrown) {
            if(thrown instanceof faults.RouteAbort) continue;
            throw thrown;
        }
    }
    throw new faults.UnknownEndpoint();
}

// Exports
export default route;
