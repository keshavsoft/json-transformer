import ifTagNameFound from "../ifTagNameFound/index.js";
import ifTransformFound from "../ifTransformFound/index.js";
import traverseArray from "../traverseArray/index.js";

const traverseObject = (specJson, dataJson) => {
    if (!specJson || typeof specJson !== "object" || Array.isArray(specJson)) return null;
    // debugger

    const element = structuredClone(specJson);
    if (!element) return null;

    if ("tagName" in element) {
        ifTagNameFound(element, dataJson);
    };

    if ("transform" in dataJson) {
        ifTransformFound(element, dataJson);
    };

    for (const [key, value] of Object.entries(element)) {
        if (Array.isArray(value)) {
            if (key in dataJson) {
                const newArray = traverseArray(value, dataJson[key]);

                element[key] = newArray;
                // delete inJsonToSpec[key];

                // console.log("newArray :", newArray);
            };
        };
    };

    return element;
};

export default traverseObject;
