// Imports
import type Server from "./server";

// Defines route class
export abstract class Route {
    // Defines constructor
    abstract match(request: Request, server: Server): Promise<boolean>;
    abstract resolve(request: Request, server: Server): Promise<Response>;
}

// Exports
export default Route;
