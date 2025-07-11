// Imports
import Fault from "../bunsvr/fault";

// Defines implemented faults
export class RouteAbort extends Fault {
    readonly code: string = "ROUTE_ABORT";
    readonly message: string = "Route handler aborted.";
    readonly status: number = 500;
}
export class ServerFailure extends Fault {
    readonly code: string = "SERVER_FAILURE";
    readonly message: string = "Internal error occurred.";
    readonly status: number = 500;
}
export class UnknownEndpoint extends Fault {
    readonly code: string = "UNKNOWN_ENDPOINT";
    readonly message: string = "The requested endpoint does not exist.";
    readonly status: number = 404;
}

// Exports
export default {
    RouteAbort,
    ServerFailure,
    UnknownEndpoint
};
