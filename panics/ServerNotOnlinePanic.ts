// Imports
import Panic from "../core/panic";

// Defines fault class
export class ServerNotOnlinePanic extends Panic {
    // Defines constructor
    readonly code: string = "SERVER_NOT_ONLINE_PANIC";
    readonly message: string = "Server is not online.";
}

// Exports
export default ServerNotOnlinePanic;
