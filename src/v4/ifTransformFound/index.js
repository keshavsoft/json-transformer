const startFunc = (inJsonToSpec, dataJson) => {
    let newElement = {};
    // console.log("inJsonToSpec : ", inJsonToSpec, dataJson);

    for (const [key, value] of Object.entries(inJsonToSpec)) {
        if (key in dataJson?.transform) {
            newElement[dataJson?.transform[key]?.alterKey] = value;
        };
    };

    return newElement;
};

export default startFunc;