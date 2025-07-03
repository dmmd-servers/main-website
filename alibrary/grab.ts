// Imports
import nodeFile from "node:fs/promises";
import nodePath from "node:path";
import faults from "./faults";
import paths from "./paths";

// Defines grabbers
export async function grabDirectory(dirpath: string, srcpath: string = paths.root): Promise<string[]> {
    // Resolves absolute path
    const abspath = nodePath.resolve(srcpath, dirpath);
    if(!abspath.startsWith(srcpath)) throw new faults.MissingDirectory();

    // Grabs directory
    try {
        const content = await nodeFile.readdir(abspath);
        return content;
    }
    catch {
        throw new faults.MissingDirectory();
    }
}
export async function grabFile(filepath: string, srcpath: string = paths.root): Promise<Bun.BunFile> {
    // Resolves absolute path
    const abspath = nodePath.resolve(srcpath, filepath);
    if(!abspath.startsWith(srcpath)) throw new faults.MissingFile();
    
    // Grabs file
    const file = Bun.file(abspath);
    if(!(await file.exists())) throw new faults.MissingFile();
    return file;
}

// Exports
export default {
    grabDirectory,
    grabFile
};
