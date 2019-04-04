import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { ItemDAO } from "../dao/item.dao";

const debug = new TDebug("nodejs:src:controllers:deleteItemHandler");

const itemDao = ItemDAO.getInstance();
export async function deleteItemHandler(req: Request, res: Response): P<any> {
    debug.log("deleteItemHandler start");
    const id =
    req.swagger.params && req.swagger.params.itemId.value;
    itemDao.deleteItem(id);
    res.status(204).end();
    debug.log("deleteItemHandler end");
}
