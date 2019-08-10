export const addTodo = todo => ({
    type:'ADD_TODO',
    todo:todo
})
export const toggleTodo = title => ({
    type:'TOGGLE_TODO',
    title:title
})