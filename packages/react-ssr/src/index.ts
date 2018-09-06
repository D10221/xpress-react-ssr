import express from "express";
import configure from "./configure";

const port = 2048;
configure(express())
    .then(app => app.listen(port, (error: Error) => {
        if (error) {
            console.error(error);
            return process.exit(-1);
        }
        console.log("React SSR listening on PORT: %s", port);
    }));
