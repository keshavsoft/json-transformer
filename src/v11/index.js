import traverse from "./traverse.js";

const transform = (source, recipe) => {
    const localSource = source;
    const localRecipe = recipe;

    return traverse({
        inSource: localSource,
        inRecipe: localRecipe
    });
};

export default transform;
