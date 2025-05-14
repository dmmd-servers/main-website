// Defines debug
export const debug = (process.env.DEBUG ?? "false").toLowerCase() === "true";

// Defines port
export const port = +(process.env.PORT ?? "3000");

// Defines root
export const root = import.meta.dir;
