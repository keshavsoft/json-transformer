import buildSpecElement from "../../../src/index.js";

import structure from "./structure.json" with {type: 'json'};
import data from "./data.json" with {type: 'json'};

const start = () => {
  try {
    let specAsJsonToDom = buildSpecElement(structure, data);

    console.log("0 : ", specAsJsonToDom);
    console.log("1 : ", specAsJsonToDom.StockItems[0].Batches);

  } catch (err) {
    console.log("error : ", err);
  };
};

start();