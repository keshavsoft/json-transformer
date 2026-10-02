import buildSpecElement from "../../../src/index.js";

import structure from "./input/structure.json" with {type: 'json'};
import data from "./input/data.json" with {type: 'json'};

const start = () => {
  try {
    let specAsJsonToDom = buildSpecElement(structure, data);
    console.log("specAsJsonToDom : ", specAsJsonToDom);
  } catch (err) {
    console.log("error : ", err);
  }
};

start();