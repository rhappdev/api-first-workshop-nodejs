import { Item } from "../models/item";
import * as uuid from "node-uuid";
import * as _ from "lodash";

export class ItemDAO {
  public static getInstance() {
    if (!ItemDAO.instance) {
      ItemDAO.instance = new ItemDAO();
    }
    return ItemDAO.instance;
  }

  private static instance: ItemDAO;
  private items: Item[] = [];

  private constructor() {}

  public getItems(): Item[] {
    return this.items;
  }

  public getItem(id: string): Item {
    return _.find(this.items, {id});
  }

  public addItem(item: Item) {
    item.id = uuid.v4();
    this.items.push(item);
  }

  public updateItem(item: Item) {
    this.items = _.unionBy([item], this.items, "id");
  }

  public deleteItem(id: string) {
    this.items = _.filter(this.items, function(item) { return item.id !== id; });
  }

}
