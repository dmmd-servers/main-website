// Imports
import type Fault from "./fault";

// Defines response resolvers
export function resolveEmpty(): Response {
    // Packs empty
    const options = {
        status: 204
    };
    const response = new Response(null, options);
    return response;
}
export function resolveFault(fault: Fault): Response {
    // Packs fault
    const data = {
        code: fault.code,
        message: fault.message
    };
    const payload = JSON.stringify(data);
    const options = {
        status: fault.status
    };
    const response = new Response(payload, options);
    return response;
}
export function resulveFile(file: Bun.BunFile): Response {
    // Packs file
    const options = {
        headers: {
            "cache-control": "max-age=86400"
        }
    };
    const response = new Response(file, options);
    return response;
}
export function resolveJSON(data: object): Response {
    // Packs JSON
    const payload = JSON.stringify(data);
    const options = {
        headers: {
            "cache-control": "max-age=86400"
        }
    };
    const response = new Response(payload, options);
    return response;
}

// Exports
export default {
    resolveEmpty,
    resolveFault,
    resulveFile,
    resolveJSON
};
