import {SUCCESS,START,FAIL} from "../constants"
export default  store => next => action=> {
    const {callApi, type,...rest} = action;
    if (!callApi) {
        next(action);
        return;
    }
    next ({...rest,type:type + START})
    setTimeout(() =>{
        fetch(callApi)
            .then(res => res.json())
            .then (response => next({...rest,type:type + SUCCESS, response}))
            .catch (error => next({...rest,type:type + FAIL, error}))
    },1000)
}
