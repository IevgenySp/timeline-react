import React, {ReactElement, useCallback, useState} from 'react';
import {is} from "@babel/types";

export interface BBox {
  x?: number,
  y?: number,
  left?: string | undefined | number,
  right?: string | undefined | number,
  top?: string | undefined | number,
  bottom?: string | undefined | number
}

const usePortalContainer: () => {
    x?: number,
    y?: number,
    left?: string | undefined | number,
    right?: string | undefined | number,
    top?: string | undefined | number,
    bottom?: string | undefined | number,
    isShown: boolean,
    handleFirstClick?: boolean,
    content: ReactElement,
    show: (isShown: boolean) => void,
    set: (options: BBox, content: ReactElement, handleFirstClick?: boolean) => void;
} = () => {
    const initialState = {
        x: 0, y: 0, left: undefined, right: undefined, top: undefined, bottom: undefined};
    const [bBox, setBBox] = useState<BBox>(initialState);
    const [isShown, setIsShown] = useState(false);
    const [content, setContent] = useState(<></>);
    const [initialClick, setInitialClick] = useState(true);

    const show = useCallback((isShown) => {
        setIsShown(isShown);
    }, [setIsShown]);

    const set = useCallback((options, content, handleFirstClick) => {
        const newBBox: BBox = initialState;
        const newInitialClick = handleFirstClick !== undefined ? handleFirstClick : true;

        options.x !== undefined && (newBBox.x = options.x);
        options.y !== undefined && (newBBox.y = options.y);
        options.left !== undefined && (newBBox.left = options.left);
        options.right !== undefined && (newBBox.right = options.right);
        options.top !== undefined && (newBBox.top = options.top);
        options.bottom !== undefined && (newBBox.bottom = options.bottom);

        setBBox(newBBox);
        setContent(content);
        setInitialClick(newInitialClick);

    }, [bBox.x, bBox.y, bBox.left, bBox.right, bBox.top, bBox.bottom, setBBox, initialClick]);

    return {...bBox, isShown, content, show, set, handleFirstClick: initialClick}
};

export default usePortalContainer;
