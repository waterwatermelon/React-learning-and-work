// 模态框操作
export const changeModal = (te, key, disable) => {
    te.setState({
        [key]: disable
    });
}

// 输入框的值监听
export const inputHandle = (event, te) => {
    console.log('event is ', event);
    console.log('te is ', te);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('name', name)
    te.setState({
        [name]: value
    })
}

// 表格序号显示
export function indexContent(index) {
    return index + 1;
}

// 处理表格分页显示
export function handleTableChange(te, page, limit, callback, pripagefunc) {
    if (pripagefunc) {
        pripagefunc(page, limit)
    } else {
        te.setState({
            displaypage: page,
            displaypagesize: limit,
        }, callback);
    }
}

// 生成页面上的 添加和搜索按钮
export function renderCRbutton(te, crudButtons) {
    if (crudButtons !== null && crudButtons.length > 0) {
       for (let i=0; i < crudButtons.length; i++) {
           
       }
    }
}

// 时间框值改变
export function datePickerValueChange(value, dateString, key, te) {
    te.setState({
        [key]: dateString,
    })
}

// 下拉框值改变
export function selectValueChange(e, key, te) {
    let value = e;
    te.setState({ [key]: value })
}