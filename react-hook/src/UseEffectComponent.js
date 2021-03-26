import { useRef, useState, useEffect } from 'react';

export default function UseEffectComponent() {
    const [page, setPage] = useState(0);
    const [condition, setCondition] = useState({ value: 1 });
    const getList = () => {
        console.log('get list');
        console.log('page :>> ', page);
        console.log('condition', condition);
    };

    const handleChangeState = () => {
        const conditionTemp = { value: condition.value + 1 };
        setPage(page + 1);
        setCondition(conditionTemp);
    }
    useEffect(() => {
        getList();
    }, [page, condition]);

    return <button onClick={handleChangeState}>change state</button>
}