// Imports
import nodePath from "node:path";
import direct from "../bunsvr/direct";
import report from "../bunsvr/report";

// Defines method
export async function grabFile(filepath: string, dirpath: string = direct.root): Promise<Bun.BunFile> {
    // Resolves absolute path
    const abspath = nodePath.resolve(dirpath, filepath);
    if(!abspath.startsWith(dirpath)) throw new report.MissingFile();
    
    // Grabs file
    const file = Bun.file(abspath);
    if(!(await file.exists())) throw new report.MissingFile();
    return file;
}

// Exports
export default grabFile;
