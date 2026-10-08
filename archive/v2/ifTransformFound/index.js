const startFunc = (inJsonToSpec, dataJson) => {
    for (const [key, value] of Object.entries(inJsonToSpec)) {
        if (key in dataJson?.transform) {
            inJsonToSpec[dataJson?.transform[key]?.alterKey] = value;
            delete inJsonToSpec[key];
        };
    };
};

export default startFunc;