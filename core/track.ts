// Defines sensitive data handlers
export function resolveIp(server: Bun.Server, request: Request): string {
    // Anonymizes do-not-track requests
    const denial = request.headers.get("DNT") === "1" || request.headers.get("Sec-GPC") === "1";
    if(denial) return "$anonymous";

    // Resolves cloudflare ips
    const cloudflareIp = request.headers.get("CF-Connecting-IP");
    if(cloudflareIp !== null) return cloudflareIp;

    // Resolves server ips
    const serverIp = server.requestIP(request);
    if(serverIp !== null) return serverIp.address;

    // Returns unknown
    return "$unknown";
}

// Exports
export default {
    resolveIp
};
