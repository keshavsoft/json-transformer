import ifTransformFound from "../ifTransformFound/index.js";
import traverseArray from "../traverseArray/index.js";

const startFunc = ({ inSource, inRecipe }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;

    let newElement = localSource;

    if (localRecipe && typeof localRecipe === "object" && "transform" in localRecipe) {
        newElement = ifTransformFound({
            inSource: localSource,
            inTransform: localRecipe.transform
        });
    }

    for (const [key, value] of Object.entries(newElement)) {
        if (Array.isArray(value) && localRecipe && key in localRecipe) {
            newElement[key] = traverseArray({
                inItems: value,
                inRecipe: localRecipe[key]
            });
        }
    }

    return newElement;
};

export default startFunc;
