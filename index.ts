// Imports
import Server from "./core/server";
import StaticRoute from "./routes/StaticRoute";

// Creates server
const server = new Server(3000);
server.register(new StaticRoute("./static/"));
await server.start();