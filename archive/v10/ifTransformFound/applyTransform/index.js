import traverse from "../../traverse.js";

const startFunc = ({ inValue, inDirective }) => {
    const localValue = inValue;
    const localDirective = inDirective;

    if (localDirective && "transform" in localDirective) {
        return traverse({
            inSource: localValue,
            inRecipe: localDirective
        });
    }

    return localValue;
};

export default startFunc;
