export default (state = [], action) => {
    console.log('reduce ',action);
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                action.todo
            ];
        case 'TOGGLE_TODO':
            return state.map((item)=>{
                if(item.title ==action.title)
                    return {...item,completed:!item.completed};
                else return item;
            })
        default:
            return state;
    }
}