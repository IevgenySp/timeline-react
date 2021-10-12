import React, {createContext, ReactElement, useContext} from 'react';
import {createPortal} from 'react-dom';
import usePortalContainer, {BBox} from "./usePortalContainer";
import useOuterClick from './useOuterClick';
import styles from './PortalContainer.module.scss';

export interface Style {
    left: undefined | string | number,
    top: undefined | string | number,
    right: undefined | string | number,
    bottom: undefined | string | number
}

export const PortalContainerContext = createContext({
   x: 0,
   y: 0,
   left: undefined,
   right: undefined,
   top: undefined,
   bottom: undefined,
   isShown: false,
   handleFirstClick: true,
   content: <></>,
   show: (isShown: boolean) => { return; },
   set: (options: BBox, content: ReactElement, handleFirstClick?: boolean) => { return; }
});

const ContainerElement: React.FC<{}> = (props) => {
    const params = useContext(PortalContainerContext);
    let firstClick = false;
    const innerRef = useOuterClick((ev: any) => {
        if (!firstClick && params.handleFirstClick) {
            firstClick = true;
        } else {
            params.show(false);
        }
    });
    let style: Style = {left: undefined, top: undefined, right: undefined, bottom: undefined};

    params.left !== undefined && (style.left = params.left);
    params.right !== undefined && (style.right = params.right);
    params.top !== undefined && (style.top = params.top);
    params.bottom !== undefined && (style.bottom = params.bottom);
    params.left === undefined && params.right === undefined && (style.left = params.x + 'px');
    params.top === undefined && params.bottom === undefined && (style.top = params.y + 'px');

    return createPortal(
      <div className={`${styles.portalContainer} ${params.isShown && styles.portalContainerVisible}`}
           style={style}
           ref={innerRef as any}
      >
      {params.content}
      </div>, document.body);
};

const PortalContainer: React.FC <{}> = (props) => {
    const container = usePortalContainer();

    //@ts-ignore
    return (<PortalContainerContext.Provider value={{...container}}>
        <ContainerElement/>
        {props.children}
    </PortalContainerContext.Provider>);
};

export default PortalContainer;
