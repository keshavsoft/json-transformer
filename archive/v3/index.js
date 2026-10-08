import registerGlobal from "./registerGlobal.js";
import { traverse } from "./traverse.js";

const buildSpecElement = (specJson, dataJson) => {
    return traverse(specJson, dataJson);
};

registerGlobal({
    inFuncDefinition: buildSpecElement,
});

export default buildSpecElement;
