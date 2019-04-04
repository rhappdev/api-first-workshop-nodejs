import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { ItemDAO } from "../dao/item.dao";
import { Item } from "../models/item";

const debug = new TDebug("nodejs:src:controllers:createItemHandler");

const itemDao = ItemDAO.getInstance();
export async function createItemHandler(req: Request, res: Response): P<any> {
    debug.log("createItemHandler start");
    const item: Item =
    req.swagger.params && req.swagger.params.item.value;
    itemDao.addItem(item);
    res.status(201).end();
    debug.log("createItemHandler end");
}
