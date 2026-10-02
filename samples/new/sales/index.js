import buildSpecElement from "../../../src/index.js";

import structure from "./structure.json" with {type: 'json'};
import data from "./data.json" with {type: 'json'};

const start = () => {
  try {
    let specAsJsonToDom = buildSpecElement(structure, data);

    console.log("0 : ", specAsJsonToDom?.Sales[0]);
    console.log("1-- : ", specAsJsonToDom?.Sales[1]);
    console.log("7-- : ", specAsJsonToDom?.Sales[6].InventoryEntries);
  } catch (err) {
    console.log("error : ", err);
  };
};

start();