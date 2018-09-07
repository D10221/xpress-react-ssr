/** */
export default function fetchCircuits() {
    if (typeof window !== "undefined")
        // http://ergast.com/api/f1/2018
        return fetch("/api/circuits")
            .then(res => res.json());            
    //
    return new Promise(async (resolve, reject) => {
        try {
            const { default: repo } = await import("./repo");
            // await here to catch error
            return resolve(await repo().get());
        } catch (error) {
            // log error and bubble up
            console.error(error);
            return reject(error);
        }
    })
}
