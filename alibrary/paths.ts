// Imports
import nodePath from "node:path";
import anchor from "../bunsvr/anchor";

// Defines paths
export const assets = nodePath.resolve(anchor.basepath, "./assets/");
export const contents = nodePath.resolve(anchor.basepath, "./static/");
export const root = anchor.basepath;

// Exports
export default {
    assets,
    contents,
    root
};
