import chalk from "chalk";
import Audit from "./audit";
import Fault from "./fault";
import Panic from "./panic";
import Server from "./server";

// const file = Bun.file("ok.txt");
// await file.write("");
// const audit = new Audit(file.writer(), true);
// const exception = new Fault();
// audit.logFault(exception);
// audit.logError(exception);
// audit.logError(exception);
// audit.logFault(exception);
const server = new Server(3000);
server.start();
