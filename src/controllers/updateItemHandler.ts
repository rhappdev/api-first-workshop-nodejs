import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { ItemDAO } from "../dao/item.dao";
import { Item } from "../models/item";
import { Error } from "../models/error";

const debug = new TDebug("nodejs:src:controllers:updateItemHandler");

const itemDao = ItemDAO.getInstance();

export async function updateItemHandler(req: Request, res: Response): P<any> {
    debug.log("updateItemHandler start");
    const item: Item =
    req.swagger.params && req.swagger.params.item.value;
    const id =
    req.swagger.params && req.swagger.params.itemId.value;
    const itemSearch = itemDao.getItem(id);
    if (itemSearch && item.id === id) {
        itemDao.updateItem(item);
        res.status(202).end();
    } else if (item.id !== id) {
        res.status(500).send({
            code: "ERR01",
            message: "Item to update has changed the id value",
            extra: "The Item to update has changed the id value, not allowed"
        } as Error);
    } else {
        res.status(500).send({
            code: "ERR02",
            message: "Item not found",
            extra: "The Item to update doesn't exists"
        } as Error);
    }
    debug.log("updateItemHandler end");
}
