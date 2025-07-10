// Imports
import inspect from "./inspect";
import pack from "./pack";
import route from "../routes/root";

// Defines preprocessor
export function preprocess(server: Bun.Server, request: Request): Request {
    // Returns request
    return request;
}

// Defines processor
export async function process(server: Bun.Server, request: Request): Promise<Response> {
    // Returns response
    const response = await route(server, request);
    return response;
}

// Defines resolver
export function resolve(server: Bun.Server, request: Request | null, thrown: unknown): Response {
    // Returns response
    const fault = inspect.inspectFault(server, request, thrown);
    const response = pack.resolveFault(fault);
    return response;
}

// Defines postprocessor
export function postprocess(server: Bun.Server, request: Request | null, response: Response): Response {
    // Returns response
    const access = inspect.inspectAccess(server, request, response);
    return access;
}

// Exports
export default {
    postprocess,
    preprocess,
    process,
    resolve
};
