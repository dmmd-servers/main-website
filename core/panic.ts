// Defines panic class
export abstract class Panic extends Error {
    // Defines constructor
    abstract readonly code: string;
    abstract readonly message: string;
    readonly name: string = "Panic";
}

// Exports
export default Panic;
