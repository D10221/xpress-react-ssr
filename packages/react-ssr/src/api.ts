/** */
export function fetchCircuits() {
    if (typeof window !== "undefined")
        // http://ergast.com/api/f1/2018
        return fetch("/circuits.json")
            .then(res => res.json())
            .then(res => res.MRData.CircuitTable.Circuits);
    //
    return new Promise(async (resolve, reject) => {
        try {
            const { join } = await import("path");
            const { readFile } = await import("fs")
            readFile(join(__dirname, "..", "dist", "circuits.json"), { encoding: "utf8" }, (error, data) => {
                if (error) return reject(error);
                return resolve(JSON.parse(data).MRData.CircuitTable.Circuits);
            });
        } catch (error) {
            return reject(error);
        }
    })
}
