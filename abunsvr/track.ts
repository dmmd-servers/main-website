// Defines tracking resolvers
export function resolveConsent(request: Request): boolean {
    // Resolves consent
    if(request.headers.get("DNT") === "1") return false;
    if(request.headers.get("Sec-GPC") === "1") return false;
    return true;
}
export function resolveIP(server: Bun.Server, request: Request): string {
    // Respects privacy
    const consent = resolveConsent(request);
    if(!consent) throw new Error("User requested IP not to be tracked.");

    // Resolves IP
    const cloudflareIP = request.headers.get("CF-Connecting-IP");
    if(cloudflareIP !== null) return cloudflareIP;
    const serverIP = server.requestIP(request);
    if(serverIP !== null) return serverIP.address;
    throw new Error("Unable to resolve IP.");
}

// Exports
export default {
    resolveConsent,
    resolveIP
};
