import { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timeId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(timeId);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debounceValue;
}
