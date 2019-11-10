import {useReducer, useEffect} from "react";

const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: "",
    data: {},
    page: 1
};

const reducers = {
    "fetch.init": (state) => ({ ...state, isLoading: true }),
    "fetch.done": (state, action) => ({ ...state, isLoading: false, data: action.data }),
    "fetch.error": (state, action) => ({ ...state, isLoading: false, isError: true, errorMessage: action.error }),
    "page.previous": (state) => ({ ...state, page: state.page > 1 ? state.page - 1 : 1 }),
    "page.next": (state) => ({ ...state, page: state.page + 1 })
};

/* I like to place my reducers in an object and get the one I need by calling the key, instead of doing the Switch dance */
const combinedReducer = (state, action) => Object.keys(reducers).includes(action.type) ? reducers[action.type](state, action) : state;

/**
 * Handles the data fetching using a function we pass to it, and by calculating the arguments from the page (so I can use one less reducer for this time)
 * @param {Number} args.initialPage page to start with
 * @param {Function} argsFromPage derives the args from the page in the state
 * @param {Function} asyncFn how we get our data
 */

const useFetching = ({ initialPage = 1, argsFromPage = (page) => ({ limit: 100, offset: (page - 1) * 100 }), asyncFn = async () => {} }) => {
    const [ state, dispatch ] = useReducer(combinedReducer, {...initialState, page: initialPage});
    console.log(initialPage);
    useEffect(
        () => {
            (async function fetchEffect(args) {
                dispatch({ type: "fetch.init" });

                const { data, error } = await asyncFn(args);
                if (error) {
                    return dispatch({ type: "fetch.error" });
                }
                
                return dispatch({type: "fetch.done", data});
            })(argsFromPage(state.page));

            return;
            // eslint-disable-next-line
        }, [ state.page ]
    );

    const nextPage = () => dispatch({ type: "page.next" });
    const previousPage = () => dispatch({ type: "page.previous" });
    return { ...state, nextPage, previousPage };
}; 

export { initialState, reducers, combinedReducer, useFetching };