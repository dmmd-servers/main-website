// Imports
import listen from "./bunsvr/listen";
import gates from "./library/gates";
import inspect from "./library/inspect";
import project from "./library/project";

// Creates server
const server = listen(
    gates.preprocess, gates.process,
    gates.resolve, gates.postprocess,
    project.port
);
inspect.inspectServer(server);
