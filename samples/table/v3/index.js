import buildSpecElement from "../../../src/index.js";

import structure from "./structure.json" with {type: 'json'};
import data from "./data.json" with {type: 'json'};

const start = () => {
  try {
    let table = buildSpecElement(structure, data);
    console.log("table : ", table);
  } catch (err) {
    console.log("error : ", err);
  };
};

start();