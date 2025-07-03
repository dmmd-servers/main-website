// Defines project constants
export const port = +(process.env.PORT ?? "3000");
export const router = (await import("../routes/root")).default;

// Exports
export default {
    port,
    router
};
