import {useReducer, useEffect} from "react";

const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: "",
    data: {}
};

const reducers = {
    "fetch.init": (state) => ({ ...state, isLoading: true }),
    "fetch.done": (state, action) => ({ ...state, isLoading: false, data: action.data }),
    "fetch.error": (state, action) => ({ ...state, isLoading: false, isError: true, errorMessage: action.error})
};

const combinedReducer = (state, action) => Object.keys(reducers).includes(action.type) ? reducers[action.type](state, action) : state;

const useFetching = ({ args = [], asyncFn = async () => {} }) => {
    const [ state, dispatch ] = useReducer(combinedReducer, initialState);
    useEffect(
        () => {
            (async function fetchEffect(args) {
                dispatch({ type: "fetch.init" });

                const {data, error} = await asyncFn(...args);
                if (error) {
                    return dispatch({ type: "fetch.error" });
                }
                
                return dispatch({type: "fetch.done", data});
            })(args);
            // eslint-disable-next-line
        }, [ ...args, asyncFn ]
    );
    return { ...state };
}; 

export { reducers, combinedReducer, useFetching};