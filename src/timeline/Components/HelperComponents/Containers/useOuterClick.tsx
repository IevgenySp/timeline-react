import {useRef, useEffect} from 'react';

const useOuterClick: (callback: any) => {
   //innerRef: React.RefObject<HTMLInputElement>;
} = (callback: any) => {
    const callbackRef = useRef<any>(null); // initialize mutable ref, which stores callback
    const innerRef = useRef<HTMLInputElement>(null); // returned to client, who marks "border" element

    // update cb on each render, so second useEffect has access to current value
    useEffect(() => { callbackRef.current = callback; });

    useEffect(() => {
        const handleClick = (e: any) => {
            if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
                callbackRef.current(e);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);

    }, []); // no dependencies -> stable click listener

    return innerRef; // convenience for client (doesn't need to init ref himself)
};

export default useOuterClick;
