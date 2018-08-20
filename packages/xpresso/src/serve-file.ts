import { RequestHandler } from "express-serve-static-core";
import { resolve, isAbsolute } from "path";
/**
 * 
 */
export default function (path: string): RequestHandler {
    /** */
    return (_req, res, next) => {
        try {
            res.sendFile(isAbsolute(path) ? path : resolve(process.cwd(), path), {
                maxAge: '1h'
            });
        } catch (error) {
            return next(error);
        }
    }
}