export default  store => next => action=> {
    console.log("state before", store.getState());
    console.log("dispatching", action);
    if(!action.generateId) return next(action);
    next ({
        ...action,
        randomId:(Date.now() + Math.random()).toString(),
        });
    console.log("state after", store.getState());
}
