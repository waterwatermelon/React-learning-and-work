const initialState = {
    number:0,
}
export default function(state = initialState,action){
    switch (action.type) {
        case 'ADD_NUMBER':
            return {
                number:state.number + 1,
            }
        default:
            return state;
    }
}