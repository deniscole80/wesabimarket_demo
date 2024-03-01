const logger = (store) => (next) => (action) => {
    // console.log("Store", store.getState());
    // console.log("Next", next);
    console.log("Action", action);
    next(action);
}

export default logger;