import traverse from "../traverse.js";

const startFunc = ({ inSource, inTransform }) => {
    const localSource = inSource;
    const localTransform = inTransform;

    const newElement = {};

    for (const [key, value] of Object.entries(localSource)) {
        if (!(key in localTransform)) {
            continue;
        }

        const directive = localTransform[key];
        const newKey = directive?.alterKey || key;

        let processedValue = value;

        if ("transform" in directive) {
            processedValue = traverse({
                inSource: value,
                inRecipe: directive
            });
        }

        if (directive?.valueType === "array" && !Array.isArray(processedValue)) {
            processedValue = [processedValue];
        }

        if (directive?.valueKey && processedValue && typeof processedValue === "object") {
            processedValue = processedValue[directive.valueKey];
        }

        newElement[newKey] = processedValue;
    }

    return newElement;
};

export default startFunc;
