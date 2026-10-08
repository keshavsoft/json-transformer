import ifTransformFound from "../ifTransformFound/index.js";
import traverseArray from "../traverseArray/index.js";

const startFunc = ({ inItems, inRecipe, inPathFromSource, inPathFromRecipe, inRootSource, inRootRecipe }) => {
    const localSource = inItems;
    const localRecipe = inRecipe;
    const localPathFromSource = inPathFromSource ?? [];
    const localPathFromRecipe = inPathFromRecipe ?? [];
    const localRootSource = inRootSource ?? inItems;
    const localRootRecipe = inRootRecipe ?? inRecipe;

    let newElement = localSource;

    if (localRecipe && typeof localRecipe === "object" && "transform" in localRecipe) {
        newElement = ifTransformFound({
            inSource: localSource,
            inTransform: localRecipe.transform,
            inPathFromSource: localPathFromSource,
            inPathFromRecipe: localPathFromRecipe,
            inRootSource: localRootSource,
            inRootRecipe: localRootRecipe
        });
    };

    for (const [key, value] of Object.entries(newElement)) {
        if (Array.isArray(value) && localRecipe && key in localRecipe) {
            newElement[key] = traverseArray({
                inItems: value,
                inRecipe: localRecipe[key],
                inPathFromSource: localPathFromSource,
                inPathFromRecipe: localPathFromRecipe,
                inRootSource: localRootSource,
                inRootRecipe: localRootRecipe
            });
        }
    }

    return newElement;
};

export default startFunc;
