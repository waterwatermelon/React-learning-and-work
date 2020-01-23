const initialState = {
    isFetch:false,
}
export default function (state=initialState,action){
    switch (action.type) {
        case  'REQUEST_FETCH':
            return { isFetch:true};
        case  'RECEIVE_FETCH':
            return {isFetch:false};
        default:
            return state;
    }
}