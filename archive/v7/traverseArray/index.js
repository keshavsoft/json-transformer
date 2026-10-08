import traverse from "../traverse.js";

const startFunc = ({ inItems, inRecipe }) => {
    const localItems = inItems;
    const localRecipe = inRecipe;

    if (!Array.isArray(localItems)) {
        return [];
    }

    return localItems
        .map((item) => traverse({ inSource: item, inRecipe: localRecipe }))
        .flat(Infinity)
        .filter(Boolean);
};

export default startFunc;
