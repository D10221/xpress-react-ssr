import { Express, Router } from "express";
/** */
export default function (router: Express | Router = Router()) {
    router.get("/", async (_req, res, next) => {
        try {
            const { default: repo } = await import("./repo");
            res.json(await repo().get())
        } catch (error) {
            return next(error);
        }
    });
    return router;
}