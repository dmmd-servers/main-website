// Imports
import nodeFile from "node:fs/promises";
import nodePath from "node:path";
import attempt from "./attempt";

// Defines resolvers
export async function resolveDirectory(dirpath: string, srcpath: string): Promise<string[] | null> {
    // Resolves destination path
    const destpath = nodePath.resolve(srcpath, dirpath);
    if(!destpath.startsWith(srcpath)) return null;

    // Resolves directory
    return attempt.resolve(() => nodeFile.readdir(destpath), null);
}
export async function resolveFile(filepath: string, srcpath: string): Promise<Bun.BunFile | null> {
    // Resolves destination path
    const destpath = nodePath.resolve(srcpath, filepath);
    if(!destpath.startsWith(srcpath)) return null;
    
    // Resolves file
    const file = Bun.file(destpath);
    if(!(await file.exists())) return null;
    return file;
}

// Exports
export default {
    resolveDirectory,
    resolveFile
};
