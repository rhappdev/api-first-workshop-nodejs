import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { ItemDAO } from "../dao/item.dao";

const debug = new TDebug("nodejs:src:controllers:getItemHandler");

const itemDao = ItemDAO.getInstance();

export async function getItemHandler(req: Request, res: Response): P<any> {
    debug.log("getItemHandler start");
    console.log(req.swagger);
    const id =
    req.swagger.params && req.swagger.params.itemId.value;
    const item = itemDao.getItem(id);
    if (item) {
        res.send(item);
    } else {
        res.send({});
    }
    debug.log("getItemHandler end");
}
