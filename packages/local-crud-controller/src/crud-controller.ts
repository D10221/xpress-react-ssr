import { RequestHandler, Request, Response } from "express";
import { Repo } from "./types";
import fromBody from "./from-body";
/** 
 * TODO: paged
 */
export default function CrudController<TRepo extends Repo>(repo: TRepo) {
  //
  const noClean = (x: any) => x;
  /**
   * READ/GET/LIST
   */
  const get: (clean?: (x: any) => any) => RequestHandler = (
    clean = noClean
  ) => async (req, res, next) => {
    try {
      const { id } = req.params;
      let data: any = null;
      if (id) {
        data = clean((await repo.findById(id)) || {});
      } else {
        data = ((await repo.all()) || []).map(clean);
      }
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  };
  /**
   * DELETE/REMOVE
   */
  const dlete: (clean?: (x: any) => any) => RequestHandler = (
    clean = noClean
  ) => async (req, res, next) => {
    try {
      clean = clean || noClean;
      const { id } = req.body;
      const data = await repo.remove(id);
      return res.json(clean(data));
    } catch (error) {
      return next(error);
    }
  };
  /**
   * Create, Add, Insert , NEW , PUT
   */
  const put: (
    payload?: (req: Request, res: Response) => any,
    clean?: (x: any) => any
  ) => RequestHandler = (payload = fromBody, clean = noClean) => async (
    req,
    res,
    next
  ) => {
    try {
      payload = payload || fromBody;
      clean = clean || noClean;
      const data = await repo.add(payload(req, res));
      return res.json(clean(data));
    } catch (error) {
      return next(error);
    }
  };
  /**
   * SET, Modify, update, POST
   */
  const post: (
    payload?: (req: Request, res: Response) => any,
    clean?: (x: any) => any
  ) => RequestHandler = (payload = fromBody, clean = noClean) => async (
    req,
    res,
    next
  ) => {
    try {
      payload = payload || fromBody;
      clean = clean || noClean;
      const data = await repo.update(payload(req, res));
      return res.json(clean(data));
    } catch (error) {
      return next(error);
    }
  };
  return {
    put,
    get,
    dlete,
    post
  };
}
