// Defines entries
export const entries = {
    UNKNOWN_EXCEPTION: {
        message: "An unknown exception was raised.",
        status: 500
    }
} satisfies {
    [ code: string ]: {
        message: string;
        status: number;
    }
};

// Defines exceptions
export class Exception extends Error {
    // Declares fields
    readonly code: keyof typeof entries;
    readonly message: string;
    readonly status: number;

    // Defines constructor
    constructor(code: keyof typeof entries) {
        // Constructs parent
        super(entries[code].message);

        // Initializes fields
        this.code = code || "UNKNOWN_EXCEPTION";
        this.message = entries[code].message;
        this.status = entries[code].status;
    }
}
export const exceptions = {} as {
    [ Code in keyof typeof entries ]: Exception;
};
for(const key in entries) {
    const code = key as keyof typeof entries;
    exceptions[code] = new Exception(code);
}
