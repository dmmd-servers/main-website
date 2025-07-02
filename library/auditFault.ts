// Imports
import chalk from "chalk";
import audit from "../bunsvr/audit";
import { Fault, ServerFailure } from "../bunsvr/report";

// Defines auditor
export function auditFault(thrown: unknown): Fault {
    // Audits fault
    if(thrown instanceof Fault) {
        audit("fault", `${thrown.message} (${thrown.code})`, chalk.red);
        return thrown;
    }

    // Audits error
    if(thrown instanceof Error) {
        audit("error", `${thrown.message} (${thrown.name})`, chalk.red);
        return new ServerFailure();
    }
    
    // Audits exception
    {
        const error = new Error(String(thrown));
        audit("error", `${error.message} (${error.name})`, chalk.red);
        return new ServerFailure();
    }
}

// Exports
export default auditFault;
