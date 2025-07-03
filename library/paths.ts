// Imports
import nodePath from "node:path";
import project from "./project";

// Defines paths
export const assets = nodePath.resolve(project.basepath, "./assets/");
export const base = project.basepath;
export const resources = nodePath.resolve(project.basepath, "./resources/");

// Exports
export default {
    assets,
    base,
    resources
};
