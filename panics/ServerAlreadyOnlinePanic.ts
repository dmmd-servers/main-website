// Imports
import Panic from "../core/panic";

// Defines fault class
export class ServerAlreadyOnlinePanic extends Panic {
    // Defines constructor
    readonly code: string = "SERVER_ALREADY_ONLINE_PANIC";
    readonly message: string = "Server is already online.";
}

// Exports
export default ServerAlreadyOnlinePanic;
