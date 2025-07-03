// Imports
import nodePath from "node:path";
import system from "../bunsvr/system";

// Defines paths
export const assets = nodePath.resolve(system.basepath, "./assets/");
export const contents = nodePath.resolve(system.basepath, "./static/");
export const root = system.basepath;

// Exports
export default {
    assets,
    contents,
    root
};
