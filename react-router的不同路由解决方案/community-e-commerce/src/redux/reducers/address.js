const initialState = {
    list:[{
        id:1,
        community:'仁里社区',
        receiver:'郭佳宁',
        phone:'13200009999',
        detail:'福建省 泉州市 石狮市 风里街道仁里社区 134号',
        isSelf:true,
        isDefault:true,
    },{
        id:2,
        community:'清风社区',
        receiver:'李末',
        phone:'18800009999',
        detail:'福建省 泉州市 石狮市 风里街道仁里社区 134号',
        isSelf:false,
        isDefault:false,
    }]
}
export default function(state=initialState,action){
    switch (action.type) {
        case 'ADD_ADDRESS':
        // case ADD_ADDRESS:
            const nextState = [...state];
            nextState.push(action.address);
            return nextState;   
        default:
            return state;
    }
}