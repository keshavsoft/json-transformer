import traverse from "../traverse.js";

const startFunc = ({ inItems, inRecipe, inPathFromSource, inPathFromRecipe, inRootSource, inRootRecipe }) => {
    const localItems = inItems;
    const localRecipe = inRecipe;
    const localPathFromSource = inPathFromSource ?? [];
    const localPathFromRecipe = inPathFromRecipe ?? [];
    const localRootSource = inRootSource;
    const localRootRecipe = inRootRecipe;

    return localItems
        .map((item) => traverse({
            inItems: localSource,
            inRecipe: localRecipe,
            inPathFromSource: localPathFromSource,
            inPathFromRecipe: localPathFromRecipe,
            inRootSource: localRootSource,
            inRootRecipe: localRootRecipe
        }))
        .flat(Infinity)
        .filter(Boolean);
};

export default startFunc;
