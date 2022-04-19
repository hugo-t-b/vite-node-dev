import { FSWatcher } from "fs";
import appRootPath from "app-root-path";
import watch from "node-watch";

const watcher = watch(appRootPath.toString(), {
  recursive: true,
    
  filter(filename: string, skip: symbol) {
    const nodeModulesRegExp = /node_modules(\/|\\)/i;
      
    if (nodeModulesRegExp.test(filename)) return skip;
    return true;
  }
});

export default new Promise<FSWatcher>((resolve, reject) => {
  watcher.on("error", error => reject(error));
  watcher.on("ready", () => resolve(watcher));
});
