import { RefObject, useLayoutEffect, useState } from 'react';

export function useElementHeight(ref: RefObject<HTMLElement | null>): number {
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        setHeight(element.clientHeight);

        const resizeObserver = new ResizeObserver(([entry]) => {
            setHeight(entry.target.clientHeight);
        });
        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, [ref]);

    return height;
}
