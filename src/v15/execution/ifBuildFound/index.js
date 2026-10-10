const keyName = "build";

const startFunc = ({ inSource, inBuild, inExecute }) => {
    const localSource = inSource;
    const localBuild = structuredClone(inBuild);
    const localExecute = inExecute;

    const localBuildObject = localBuild[keyName];

    delete localBuild[keyName];

    console.log("aaaaaaa : ", localSource);

    for (const [key, value] of Object.entries(localBuildObject)) {
        let loopInsideArray = [];

        for (const [rowKey, rowValue] of Object.entries(localSource[key])) {
            const loopInsideBuild = structuredClone(localBuild[key][keyName]);
            loopInsideBuild.textContent = rowValue;

            loopInsideArray.push(loopInsideBuild);
        };

        localBuildObject[key] = loopInsideArray;

    };

    console.log("bbbbbbb : ", localBuildObject);

    return inSource;
};

export default startFunc;
