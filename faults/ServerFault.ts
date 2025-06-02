// Imports
import Fault from "../core/fault";

// Defines fault class
export class ServerFault extends Fault {
    // Defines constructor
    readonly code: string = "SERVER_FAULT";
    readonly message: string = "An internal error occurred.";
    readonly status: number = 500;
}

// Exports
export default ServerFault;
