import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { ItemDAO } from "../dao/item.dao";
import { Error} from "../models/error";

const debug = new TDebug("nodejs:src:controllers:deleteItemHandler");

const itemDao = ItemDAO.getInstance();
export async function deleteItemHandler(req: Request, res: Response): P<any> {
    debug.log("deleteItemHandler start");
    const id =
    req.swagger.params && req.swagger.params.itemId.value;
    const itemSearch = itemDao.getItem(id);
    if (itemSearch) {
        itemDao.deleteItem(id);
        res.status(204).end();
    } else {
        res.status(500).send({
            code: "ERR01",
            message: "Item not found",
            extra: "The Item to update doesn't exsists"
        } as Error);
    }
    debug.log("deleteItemHandler end");
}
