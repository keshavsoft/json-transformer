const startFunc = (inJsonToSpec, dataJson) => {
    let newElement = {};
    // console.log("inJsonToSpec : ", inJsonToSpec, dataJson);

    for (const [key, value] of Object.entries(inJsonToSpec)) {
        if (key in dataJson?.transform) {
            let newkey;

            if ("alterKey" in dataJson?.transform[key]) {
                newkey = dataJson?.transform[key]?.alterKey;
                newElement[newkey] = value;
            };

            if ("valueType" in dataJson?.transform[key]) {
                const valueType = dataJson?.transform[key]?.valueType;
                if (valueType === "array") {
                    newElement[newkey] = [value];
                } else {
                    newElement[newkey] = value;
                };
            };

            if ("valueKey" in dataJson?.transform[key]) {
                const newValue = dataJson?.transform[key]?.valueKey;

                newElement[newkey] = newElement[newkey][newValue];
            };
        };
    };

    return newElement;
};

export default startFunc;