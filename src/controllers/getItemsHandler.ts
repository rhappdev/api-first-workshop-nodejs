import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { ItemDAO } from "../dao/item.dao";

const debug = new TDebug("nodejs:src:controllers:getItemsHandler");

const itemDao = ItemDAO.getInstance();

export async function getItemsHandler(req: Request, res: Response): P<any> {
    debug.log("getItemsHandler start");
    const items = itemDao.getItems();
    res.send(items);
    debug.log("getItemsHandler end");
}
