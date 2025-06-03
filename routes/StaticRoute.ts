// Imports
import nodeFile from "node:fs/promises";
import nodePath from "node:path";
import * as project from "../core/project";
import Route from "../core/route";
import type Server from "../core/server";
import EndpointNotFoundFault from "../faults/EndpointNotFoundFault";

// Defines route class
export class StaticRoute extends Route {
    // Defines constructor
    readonly dirpath: string;
    constructor(source: string) {
        // Initializes class
        super();
        this.dirpath = nodePath.resolve(project.root, source);
    }

    // Defines matcher
    async match(request: Request, server: Server): Promise<boolean> {
        // Matches request
        console.log(">>>>>>>>>>>", request.url);
        const url = new URL(request.url);
        const pathname = url.pathname;
        const filepath = nodePath.resolve(this.dirpath, pathname.slice(1));
        if(!this.dirpath.startsWith(filepath)) return false;
        const filestat = await nodeFile.stat(filepath);
        console.log(">>>>>>>>>>>", request.url, filepath);
        console.log(">>>>>>>>>>>", request.url, filestat.isFile());
        console.log(">>>>>>>>>>>", request.url, "hello1");
        if(!filestat.isFile()) return false;
        console.log(">>>>>>>>>>>", request.url, "hello2");
        // const file = Bun.file(filepath);
        // return await file.exists();
        return false;
    }

    // Defines resolver
    async resolve(request: Request, server: Server): Promise<Response> {
        console.log("ok");
        const url = new URL(request.url);
        const pathname = url.pathname;
        const filepath = nodePath.resolve(this.dirpath, pathname.slice(1));
        const file = Bun.file(filepath);
        return new Response(file);
    }
}

// Exports
export default StaticRoute;
