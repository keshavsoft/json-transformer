import ifTransformFound from "./ifTransformFound/index.js";
import ifOperationFound from "./ifOperationFound/index.js";

const showLogs = false;

const startFunc = ({ inSource, inRecipe }) => {
    let localSource = inSource;
    const localRecipe = inRecipe;

    if (showLogs) {
        console.log("execution", localSource, localRecipe);
    }

    if (localRecipe && typeof localRecipe === "object" && "transform" in localRecipe) {
        const fromTransform = ifTransformFound({
            inSource: localSource,
            inTransform: localRecipe.transform,
            inExecute: startFunc
        });

        localSource = fromTransform;
    };

    if (localRecipe && typeof localRecipe === "object" && "operation" in localRecipe) {
        const fromOperation = ifOperationFound({
            inSource: localSource,
            inOperation: localRecipe.operation,
            inExecute: startFunc
        });

        localSource = fromOperation;
    };

    return localSource;
};

export default startFunc;
