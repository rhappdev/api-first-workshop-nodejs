import { ItemDAO } from "../../src/dao/item.dao";
import * as chai from "chai";
import { Item } from "../../src/models/item";

const expect = chai.expect;
describe("ItemDAO - Test ItemDAO Methods", function () {
  const itemDAO = ItemDAO.getInstance();
  it("getItems - Should retrieve an empty array", (done: () => void): void => {
    expect(itemDAO.getItems().length).to.be.equal(0);
    done();
  });
  it("addItem - Should add an item", (done: () => void): void => {
      itemDAO.addItem({"description": "Description", name: "Name", id: "id"});
      expect(itemDAO.getItems().length).to.be.equal(1);
      expect(itemDAO.getItems()[0].description).to.be.equal("Description");
      expect(itemDAO.getItems()[0].name).to.be.equal("Name");
      done();
  });
  it("getItems - Should retrieve an item", (done: () => void): void => {
    expect(itemDAO.getItems().length).to.be.equal(1);
    done();
  });
  it("getItem - Should retrieve an item", (done: () => void): void => {
    const item = itemDAO.getItems()[0];
    expect(itemDAO.getItem(item.id)).not.to.be.equal(undefined);
    done();
  });
  it("getItem - Should not retrieve an item", (done: () => void): void => {
    expect(itemDAO.getItem("xxxx-ssssss-sssss")).to.be.equal(undefined);
    done();
  });
  it("updateItem - Should update an item", (done: () => void): void => {
    const item = itemDAO.getItems()[0];
    item.description = "Description 2";
    item.name = "Name 2";
    itemDAO.updateItem(item);
    expect(itemDAO.getItems()[0].name).to.be.equal("Name 2");
    expect(itemDAO.getItems()[0].description).to.be.equal("Description 2");
    done();
  });
  it("deleteItem - Should delete an item", (done: () => void): void => {
    const item = itemDAO.getItems()[0];
    itemDAO.deleteItem(item.id);
    expect(itemDAO.getItems().length).to.be.equal(0);
    done();
  });
});
