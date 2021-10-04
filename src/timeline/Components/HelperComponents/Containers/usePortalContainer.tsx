import React, {ReactElement, useCallback, useState} from 'react';

export interface BBox {
  x: number,
  y: number,
}

const usePortalContainer: () => {
    x: number,
    y: number,
    isShown: boolean,
    content: ReactElement,
    show: (isShown: boolean) => void,
    set: (options: BBox, content: ReactElement) => void;
} = () => {
    const [bBox, setBBox] = useState<BBox>({x: 0, y: 0});
    const [isShown, setIsShown] = useState(false);
    const [content, setContent] = useState(<></>);

    const show = useCallback((isShown) => setIsShown(isShown), [setIsShown]);

    const set = useCallback((options, content) => {
        const newBBox: BBox = {x: bBox.x, y: bBox.y};

        options.x && (newBBox.x = options.x);
        options.y && (newBBox.y = options.y);

        setBBox(newBBox);
        setContent(content);

    }, [bBox.x, bBox.y, setBBox]);

    return {...bBox, isShown, content, show, set}
};

export default usePortalContainer;
