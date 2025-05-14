// Defines route type
export type Route = (request: Request) => Response | Promise<Response>;

export async function handle(request: Request): Promise<Response> {
    throw new Error("tbd");
}
