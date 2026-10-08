import resolveKey from "./resolveKey/index.js";
import applyTransform from "./applyTransform/index.js";
import normalizeValueType from "./normalizeValueType/index.js";
import extractValueKey from "./extractValueKey/index.js";

const showLog = true;

const isObject = (val) => {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
};

const startFunc = ({ inSource, inTransform, inPathFromSource, inPathFromRecipe, inRootSource, inRootRecipe }) => {
    const localSource = inSource;
    const localTransform = inTransform;
    const localPathFromSource = inPathFromSource ?? [];
    const localPathFromRecipe = inPathFromRecipe ?? [];
    const localRootSource = inRootSource ?? inSource;
    const localRootRecipe = inRootRecipe ?? localTransform;

    const newElement = {};

    for (const [key, value] of Object.entries(localSource)) {
        if (!(key in localTransform)) {
            continue;
        };

        const directive = localTransform[key];
        const newKey = resolveKey({ inKey: key, inDirective: directive });
        const currentPathFromSource = [...localPathFromSource, key];
        const currentPathFromRecipe = [...localPathFromRecipe, newKey];

        let processedValue = value;

        const ifObject = isObject(directive);

        if (ifObject) {
            processedValue = applyTransform({ inValue: processedValue, inDirective: directive });
            processedValue = normalizeValueType({ inValue: processedValue, inDirective: directive });
            processedValue = extractValueKey({ inValue: processedValue, inDirective: directive });
        };

        if (typeof directive === 'string') {
            if (directive === 'function') {
                if (showLog) console.log("---2 : directive: ", directive);
                localTransform[key] = async ({ processedValue }) => {
                    console.log("processedValue : ", processedValue);

                };
            };
        };

        newElement[newKey] = processedValue;
    }

    return newElement;
};

export default startFunc;
