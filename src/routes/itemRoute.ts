import { Router } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { getItemsHandler } from "../controllers/getItemsHandler";
import { createItemHandler } from "../controllers/createItemHandler";
import { getItemHandler } from "../controllers/getItemHandler";
import { updateItemHandler } from "../controllers/updateItemHandler";
import { deleteItemHandler } from "../controllers/deleteItemHandler";

export const getItems  = Router().use("/", asyncHandler(getItemsHandler, "getItems"));
export const createItem  = Router().use("/", asyncHandler(createItemHandler, "createItem"));
export const getItem  = Router().use("/", asyncHandler(getItemHandler, "getItem"));
export const updateItem  = Router().use("/", asyncHandler(updateItemHandler, "updateItem"));
export const deleteItem  = Router().use("/", asyncHandler(deleteItemHandler, "deleteItem"));
