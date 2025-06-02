// Imports
import Fault from "../core/fault";

// Defines fault class
export class EndpointNotFound extends Fault {
    // Defines constructor
    readonly code: string = "ENDPOINT_NOT_FOUND_FAULT";
    readonly message: string = "Unknown endpoint.";
    readonly status: number = 404;
}

// Exports
export default EndpointNotFound;
