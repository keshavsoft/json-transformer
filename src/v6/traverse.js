import { traverseArray } from "./traverseArray/index.js";
import traverseObject from "./traverseObject/index.js";
/**
 * Traverse the JSON-to-DOM specJsonification.
 *
 * This is the central dispatcher, intentionally modeled after the clear
 * traversal boundary used by node-json-transformer.
 */
const traverse = (specJson, dataJson) => {
    if (specJson === null || specJson === undefined) return null;
    // debugger
    if (typeof Node !== "undefined" && specJson instanceof Node) {
        return specJson;
    }

    if (Array.isArray(specJson)) {
        return traverseArray(specJson, dataJson);
    };

    if (typeof specJson === "object") {
        return traverseObject(specJson, dataJson);
    };

    return specJson;
};

export { traverse };
export default traverse;