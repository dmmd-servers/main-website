// Imports
import Signal from "../core/signal";

// Defines fault class
export class RouteAbortSignal extends Signal {
    // Defines constructor
    readonly code: string = "ROUTE_ABORT_SIGNAL";
}

// Exports
export default RouteAbortSignal;
