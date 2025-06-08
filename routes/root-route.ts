// Imports
import nodePath from "node:path";
import * as project from "../core/project";

// Defines root route function
export async function rootRoute(request: Request, server: Bun.Server): Promise<Response> {
    // Returns home page
    const filepath = nodePath.resolve(project.rootPath, "./assets/html/index.html");
    const file = Bun.file(filepath);
    return new Response(file);
}

// Exports
export default rootRoute;
