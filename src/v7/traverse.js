import traverseArray from "./traverseArray/index.js";
import traverseObject from "./traverseObject/index.js";

const startFunc = ({ inSource, inRecipe }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;

    if (localSource === null || localSource === undefined) {
        return null;
    }

    if (Array.isArray(localSource)) {
        return traverseArray({
            inItems: localSource,
            inRecipe: localRecipe
        });
    }

    if (typeof localSource === "object") {
        return traverseObject({
            inSource: localSource,
            inRecipe: localRecipe
        });
    }

    return localSource;
};

export default startFunc;
