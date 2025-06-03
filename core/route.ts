// Imports
import type Server from "./server";

// Defines route class
export abstract class Route {
    // Defines matcher
    abstract match(request: Request, server: Server): Promise<boolean>;

    // Defines resolver
    abstract resolve(request: Request, server: Server): Promise<Response>;
}

// Exports
export default Route;
