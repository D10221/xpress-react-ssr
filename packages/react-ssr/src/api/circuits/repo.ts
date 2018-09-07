import { readFile } from "fs";
import { join } from "path";
/**
 * Data Layer
 */
export default function(){
    const get = ()=> {
        return new Promise((resolve, reject) => {
            const path = join(process.cwd(), "data", "circuits.json");
            readFile(path, { encoding: "utf8" }, (error, text) => {
                if (error) return reject(error);
                const data = JSON.parse(text);
                return resolve(data.MRData.CircuitTable.Circuits);
            });
        })
    }
    return {
        get
    }
}