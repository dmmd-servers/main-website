// Defines abstract fault
export abstract class Fault extends Error {
    abstract readonly code: string;
    abstract readonly message: string;
    abstract readonly status: number;
    readonly name: string = "Fault";
}

// Defines implemented faults
export class DoNotTrack extends Fault {
    readonly code: string = "DO_NOT_TRACK";
    readonly message: string = "The request asked not to be tracked.";
    readonly status: number = 500;
}
export class MissingAsset extends Fault {
    readonly code: string = "MISSING_ASSET";
    readonly message: string = "The requested asset does not exist.";
    readonly status: number = 404;
}
export class MissingDirectory extends Fault {
    readonly code: string = "MISSING_DIRECTORY";
    readonly message: string = "The requested directory does not exist.";
    readonly status: number = 404;
}
export class MissingEndpoint extends Fault {
    readonly code: string = "MISSING_ENDPOINT";
    readonly message: string = "The requested endpoint does not exist.";
    readonly status: number = 404;
}
export class MissingFile extends Fault {
    readonly code: string = "MISSING_FILE";
    readonly message: string = "The requested file does not exist.";
    readonly status: number = 404;
}
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

// Exports
export default {
    DoNotTrack,
    Fault,
    MissingAsset,
    MissingDirectory,
    MissingEndpoint,
    MissingFile,
    RouteAbort,
    ServerFailure
};
