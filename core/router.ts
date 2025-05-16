// Imports
import nodePath from "node:path";
import * as project from "./project";

// Defines routes
export type Pattern = RegExp | string;
export type Resolve = (request: Request, server: Bun.Server) => (Response | null) | Promise<Response | null>;
export type Route = {
    pattern: Pattern;
    resolve: Resolve;
};
export const routes: Route[] = [
    {
        pattern: "/",
        resolve: async () => {
            // Resolves index.html
            const filepath = nodePath.resolve(project.root, "./assets/html/index.html");
            const file = Bun.file(filepath);
            if(!(await file.exists())) return null;
            return new Response(file);
        }
    },
    {
        pattern: /^\/assets\/*/,
        resolve: async (request) => {
            // Resolves assets
            const url = new URL(request.url);
            const dirpath = nodePath.resolve(project.root, "./assets/");
            const filepath = nodePath.resolve(dirpath, url.pathname.split("/").slice(2).join("/"));
            if(!filepath.startsWith(dirpath)) return null;
            const file = Bun.file(filepath);
            if(!(await file.exists())) return null;
            return new Response(file);
        }
    },
    {
        pattern: /^\/*/,
        resolve: async (request) => {
            // Resolves public
            const url = new URL(request.url);
            const dirpath = nodePath.resolve(project.root, "./public/");
            const filepath = nodePath.resolve(dirpath, url.pathname.split("/").slice(1).join("/"));
            if(!filepath.startsWith(dirpath)) return null;
            const file = Bun.file(filepath);
            if(!(await file.exists())) return null;
            return new Response(file);
        }
    }
];
