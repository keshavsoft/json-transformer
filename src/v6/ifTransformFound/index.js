import traverse from "../traverse.js";

const startFunc = (inJsonToSpec, inTransform) => {
    let newElement = {};
    // console.log("inJsonToSpec : ", inJsonToSpec, dataJson);

    for (const [key, value] of Object.entries(inJsonToSpec)) {
        if (key in inTransform) {
            let newkey;

            if ("alterKey" in inTransform[key]) {
                newkey = inTransform[key]?.alterKey;
                newElement[newkey] = value;
            };

            if ("transform" in inTransform[key]) {
                newElement[newkey] = traverse(value, inTransform[key]);
            };

            if ("valueType" in inTransform[key]) {
                const valueType = inTransform[key]?.valueType;

                if (valueType === "array") {
                    newElement[newkey] = [newElement[newkey]];
                };
            };

            if ("valueKey" in inTransform[key]) {
                const newValue = inTransform[key]?.valueKey;

                newElement[newkey] = newElement[newkey][newValue];
            };
        };
    };

    return newElement;
};

export default startFunc;