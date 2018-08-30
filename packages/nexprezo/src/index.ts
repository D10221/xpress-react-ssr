import express from "express";
import configure from "./configure";
import start from "./start";
import { AddressInfo } from "net";

const app = express();
/** */
configure(app)
    .then(start)
    .then(server => {
        let address = ((aa) => aa = typeof aa === "string"
            ? aa
            : ((a: AddressInfo) => `${a.family}${a.address}:${a.port}`)(aa))(server.address());
        console.log("Exp - %s: listening....", address);
    })
    .catch(error => {
        console.error(error);
        process.exit(-1);
    })



