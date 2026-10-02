import ifTransformFound from "../ifTransformFound/index.js";
import traverseArray from "../traverseArray/index.js";

const traverseObject = (specJson, dataJson) => {
    if (!specJson || typeof specJson !== "object" || Array.isArray(specJson)) return null;
    // debugger

    let newElement;

    if ("transform" in dataJson) {
        newElement = ifTransformFound(specJson, dataJson?.transform);
    };

    for (const [key, value] of Object.entries(newElement)) {
        if (Array.isArray(value)) {
            if (key in dataJson) {
                const newArray = traverseArray(value, dataJson[key]);

                newElement[key] = newArray;
            };
        };
    };

    return newElement;
};

export default traverseObject;
