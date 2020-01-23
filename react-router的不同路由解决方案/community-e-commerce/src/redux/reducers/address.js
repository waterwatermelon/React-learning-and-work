import { ADD_ADDRESS,SET_ADDRESS_LIST,} from '../actions/actionType';
const initialState = {
    list:[]
}
export default function(state=initialState,action){
    switch (action.type) {
        case ADD_ADDRESS:
            const nextState = [...state];
            nextState.push(action.address);
            return nextState;   
        case SET_ADDRESS_LIST:
            return { ...state,list:action.addressList};
        default:
            return state;
    }
}