export function init(count) {
    return count;
}

export const initialState = 1;

export function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        case "MULTIPLY":
            return state * 10;
        case "RESET":
            return init(action.payload || initialState);
        default:
            return state;
    }
}