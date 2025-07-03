// Imports
import nodeFile from "node:fs/promises";
import nodePath from "node:path";

// Defines resolvers
export async function resolveDirectory(dirpath: string, srcpath: string): Promise<string[] | null> {
    // Resolves absolute path
    const abspath = nodePath.resolve(srcpath, dirpath);
    if(!abspath.startsWith(srcpath)) return null;

    // Grabs directory
    try {
        const content = await nodeFile.readdir(abspath);
        return content;
    }
    catch {
        return null;
    }
}
export async function resolveFile(filepath: string, srcpath: string): Promise<Bun.BunFile | null> {
    // Resolves absolute path
    const abspath = nodePath.resolve(srcpath, filepath);
    if(!abspath.startsWith(srcpath)) return null;
    
    // Grabs file
    const file = Bun.file(abspath);
    if(!(await file.exists())) return null;
    return file;
}



// Exports
export default {
    resolveDirectory,
    resolveFile
};
