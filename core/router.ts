// Imports
import * as audit from "./audit";
import * as except from "./except";
import * as project from "./project";

// Defines routes
export type Pattern = RegExp | string;
export type Resolve = (request: Request, server: Bun.Server) => Response | Promise<Response>;
export type Route = {
    pattern: Pattern;
    resolve: Resolve;
};
export const routes: Route[] = [
    {
        pattern: "/",
        resolve: (request) => {
            return new Response("Hello, world!");
        }
    }
];
