// Defines sensitive data handlers
export function resolveConsent(request: Request): boolean {
    // Resolves consent
    const denial =
        request.headers.get("DNT") === "1" ||
        request.headers.get("Sec-GPC") === "1";
    const consent = !denial;
    return consent;
}
export function resolveIp(server: Bun.Server, request: Request): string {
    // Anonymizes do-not-track requests
    const consent = resolveConsent(request);
    if(!consent) return "$anonymous";

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
    resolveConsent,
    resolveIp
};
