import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { ItemDAO } from "../dao/item.dao";
import { Item } from "../models/item";

const debug = new TDebug("nodejs:src:controllers:updateItemHandler");

const itemDao = ItemDAO.getInstance();

export async function updateItemHandler(req: Request, res: Response): P<any> {
    debug.log("updateItemHandler start");
    const item: Item =
    req.swagger.params && req.swagger.params.item.value;
    itemDao.updateItem(item);
    res.status(202).end();
    debug.log("updateItemHandler end");
}
