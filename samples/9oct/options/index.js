import buildSpecElement from "../../../src/index.js";
import structure from './structure.json' with {type: 'json'};
import data from './data.json' with {type: 'json'};

const start = () => {
  let specAsJsonToDom = buildSpecElement(structure, data);

  console.log("specAsJsonToDom : ", specAsJsonToDom);
  console.log("specAsJsonToDom : ", specAsJsonToDom.children[0]);
};

start();
