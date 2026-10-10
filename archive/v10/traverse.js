import traverseArray from "./traverseArray/index.js";
import traverseObject from "./traverseObject/index.js";

const startFunc = ({ inSource, inRecipe, inPathFromSource, inPathFromRecipe, inRootSource, inRootRecipe }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;
    const localPathFromSource = inPathFromSource ?? [];
    const localPathFromRecipe = inPathFromRecipe ?? [];
    const localRootSource = inRootSource ?? inSource;
    const localRootRecipe = inRootRecipe ?? inRecipe;

    if (Array.isArray(localSource)) {
        return traverseArray({
            inItems: localSource,
            inRecipe: localRecipe,
            inPathFromSource: localPathFromSource,
            inPathFromRecipe: localPathFromRecipe,
            inRootSource: localRootSource,
            inRootRecipe: localRootRecipe
        });
    };

    if (typeof localSource === "object" && localSource !== null) {
        return traverseObject({
            inItems: localSource,
            inRecipe: localRecipe,
            inPathFromSource: localPathFromSource,
            inPathFromRecipe: localPathFromRecipe,
            inRootSource: localRootSource,
            inRootRecipe: localRootRecipe
        });
    };

    return localSource;
};

export default startFunc;
