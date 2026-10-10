import structure from "./structure.json" with {type: 'json'};
import data from "./data.json" with {type: 'json'};

const start = () => {
  const findkey = "children[0].children[0].children";

  const result = findkey
    .split(".")
    .reduce((obj, key) => {
      return key.split("[").reduce((value, part) => {
        return part.endsWith("]")
          ? value[part.slice(0, -1)]
          : value[part];
      }, obj);
    }, structure);

  console.log(result);

};

start();