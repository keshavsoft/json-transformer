const startFunc = ({ inSource, inOperation, inExecute }) => {
    const localSource = inSource;
    const localOperation = inOperation;
    const localExecute = inExecute;

    // console.log("ifOperationFound : ", localSource, localOperation, localExecute);

    for (const [key, value] of Object.entries(localOperation)) {

        if ("operationType" in value) {
            if (value.operationType === "loopArray") {
                if (key in localSource) {
                    // localSource[key] = "charan";

                    localSource[key] = value.arrayData;


                };
            };
        };
    };

    return localSource;
};

export default startFunc;
