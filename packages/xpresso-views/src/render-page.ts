import { RequestHandler, Request } from "express-serve-static-core";
import render from "./render";
import selector from "./selector";
import Page from "./page";
/**
 * 
 */
export default (page: string, extra: (req: Request) => { title: string, header?: React.ReactNode }): RequestHandler => {

    return render(Page, req => ({ ...selector(req), page, ...extra(req) }));
}