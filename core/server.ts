// Imports
import chalk from "chalk";
import Audit from "./audit";
import Fault from "./fault";
import Panic from "./panic";
import Route from "./route";
import EndpointNotFoundFault from "../faults/EndpointNotFoundFault";
import ServerAlreadyOnlinePanic from "../panics/ServerAlreadyOnlinePanic";
import ServerNotOnlinePanic from "../panics/ServerNotOnlinePanic";
import ServerFault from "../faults/ServerFault";

// Defines server class
export class Server {
    // Defines constructor
    private _core: Bun.Server | null = null;
    readonly audit: Audit;
    readonly port: number;
    readonly registry: Route[];
    constructor(
        port: number,
        audit: Audit = new Audit(),
        routes: Route[] = []
    ) {
        // Initializes class
        this._core = null;
        this.audit = audit;
        this.port = port;
        this.registry = routes;
    }

    // Defines registry handlers
    register(route: Route): boolean {
        // Registers route
        this.registry.push(route);
        return true;
    }
    unregister(route: Route): boolean {
        // Unregisters route
        const index = this.registry.indexOf(route);
        if(index === -1) return false;
        this.registry.splice(index, 1);
        return true;
    }

    // Defines fetcher
    async fetch(request: Request): Promise<Response> {
        // Fetches request
        if(this._core === null) throw new ServerNotOnlinePanic();
        try {
            // Resolves request
            for(let i = 0; i < this.registry.length; i++) {
                const route = this.registry[i]!;
                if(!(await route.match(request, this))) continue;
                try {
                    const route = this.registry.find(async (route) => await route.match(request, this));
                    console.log(route);
                    if(typeof route === "undefined") throw new EndpointNotFoundFault();
                    console.log(route, "i found a route");
                    const response = await route.resolve(request, this);
                    console.log(response);
                    this.audit.logFetch(request, response, this._core);
                    return response;
                }
                catch(thrown) {

                }
            }
        }
        catch(thrown) {
            // Handles thrown
            const fault = thrown instanceof Fault ? thrown : new ServerFault();
            const response = Response.json({
                code: fault.code,
                message: fault.message,
            }, fault.status);
            if(thrown instanceof Fault) this.audit.logFault(thrown);
            else if(thrown instanceof Panic) this.audit.logPanic(thrown);
            else if(thrown instanceof Error) this.audit.logError(thrown);
            else this.audit.logError(new Error(String(thrown)));
            this.audit.logFetch(request, response, this._core);
            return response;
        }
    }

    // Defines controllers
    async start(): Promise<void> {
        // Starts server
        if(this._core !== null) throw new ServerAlreadyOnlinePanic();
        this._core = Bun.serve({
            development: false,
            fetch: async (request) => this.fetch(request),
            port: this.port
        });

        // Logs status
        const url = `http://localhost:${this.port}/`;
        this.audit.logRaw("SERVER", `Server is now listening on ${chalk.cyan(url)}.`, chalk.green);
    }
    async stop(): Promise<void> {
        // Stops server
        if(this._core === null) throw new ServerNotOnlinePanic();
        await this._core.stop();
        this._core = null;

        // Logs status
        const url = `http://localhost:${this.port}/`;
        this.audit.logRaw("SERVER", `Server gracefully shutdown from ${chalk.cyan(url)}.`, chalk.green);
    }

    // Defines properties
    get core() {
        // Returns core
        return this._core;
    }
}

// Exports
export default Server;
