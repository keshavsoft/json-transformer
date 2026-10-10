import ifTransformFound from "./ifTransformFound/index.js";
import ifOperationFound from "./ifOperationFound/index.js";
import ifBuildFound from "./ifBuildFound/index.js";

const showLogs = false;

const startFunc = ({ inSource, inRecipe }) => {
    let localSource = inSource;
    const localRecipe = inRecipe;

    console.log("1111111 : ", inSource, inRecipe);

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

    if (localRecipe && typeof localRecipe === "object" && "build" in localRecipe) {
        const fromOperation = ifBuildFound({
            inSource: localSource,
            inBuild: localRecipe,
            inExecute: startFunc
        });

        localSource = fromOperation;
    };

    return localSource;
};

export default startFunc;
