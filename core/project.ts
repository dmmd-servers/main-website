// Defines project constants
export const log = Bun.stdout.writer();
export const port = +(process.env.PORT ?? "3000");
export const router = (await import("../routes/routers/root")).default;

// Exports
export default {
    log,
    port,
    router
};
