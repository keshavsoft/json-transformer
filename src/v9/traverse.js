import traverseArray from "./traverseArray/index.js";
import traverseObject from "./traverseObject/index.js";

const startFunc = ({ inSource, inRecipe }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;

    if (Array.isArray(localSource)) {
        return traverseArray({
            inItems: localSource,
            inRecipe: localRecipe
        });
    }

    if (typeof localSource === "object" && localSource !== null) {
        return traverseObject({
            inSource: localSource,
            inRecipe: localRecipe
        });
    }

    return localSource;
};

export default startFunc;
