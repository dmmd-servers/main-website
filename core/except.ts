// Defines exceptions
export abstract class Exception extends Error {
    // Declares fields
    abstract readonly code: string;
    abstract readonly message: string;
    abstract readonly status: number;
}
export class UnknownException extends Exception {
    // Defines fields
    readonly code = "UNKNOWN_EXCEPTION";
    readonly message = "An unknown exception has occurred.";
    readonly status = 500;
}
