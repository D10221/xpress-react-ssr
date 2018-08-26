import { RequestHandler } from "express-serve-static-core";
import render from "./render";
import selector from "./selector";
import Page from "./page";
/**
 * 
 */
export default (page: string): RequestHandler => {
    return render(Page, req => ({ ...selector(req), page }));
}