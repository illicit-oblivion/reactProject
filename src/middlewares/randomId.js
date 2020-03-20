export default  store => next => action=> {
    console.log("state before", store.getState());
    console.log("dispatching", action);

    next ({
        ...action,
        payload:{
            ...action.payload,
            id:new Date().getTime().toString(),
        }});
    console.log("state after", store.getState());
}
