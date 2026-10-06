import traverse from "./traverse.js";

const startFunc = ({ inSource, inRecipe }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;

    return traverse({
        inSource: localSource,
        inRecipe: localRecipe
    });
};

const transform = (inSource, inRecipe) => {
    if (inSource && typeof inSource === "object" && "inSource" in inSource) {
        return startFunc(inSource);
    }

    return startFunc({
        inSource,
        inRecipe
    });
};

export default transform;
