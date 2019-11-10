/* eslint-disable no-undef */

import { initialState, combinedReducer } from "./useFetching";

it("fetch.init leads to the correct state", () => {
    const newState = combinedReducer(
        initialState, ({type: "fetch.init"})
    );
    expect(newState).toStrictEqual({...initialState, isLoading: true});
});

it("fetch.done leads to the correct state", () => {
    const fetchedData = [ {test: true} ];
    const newState = combinedReducer(
        initialState, ({ type: "fetch.done", data: fetchedData })
    );
    expect(newState).toStrictEqual({ ...initialState, isLoading: false, data: fetchedData });
});

it("fetch.error leads to the correct state", () => {
    const error = "this is an error";
    const newState = combinedReducer(
        initialState, ({ type: "fetch.error", error })
    );
    expect(newState).toStrictEqual({ ...initialState, isLoading: false, isError: true, errorMessage: error });
});