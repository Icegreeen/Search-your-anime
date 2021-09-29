
import { useRef } from "react";

// Debaunce : Ele permite a execução de uma função(get) apenas se um determinado tempo se passou.

export default function useDebounce(fn, delay) {
    const timeoutRef = useRef(null);
    
    function debounceFn(...args){
        window.clearTimeout(timeoutRef.current)

        timeoutRef.current = window.setTimeout(() => {
            fn(...args);
        }, delay);
    }

    return debounceFn;
}