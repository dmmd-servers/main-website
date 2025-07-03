// Defines abstract fault
export abstract class Fault extends Error {
    abstract readonly code: string;
    abstract readonly message: string;
    abstract readonly status: number;
    readonly name: string = "Fault";
}

// Exports
export default Fault;
