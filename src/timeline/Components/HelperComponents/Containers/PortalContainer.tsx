import React, {createContext, ReactElement, useContext} from 'react';
import {createPortal} from 'react-dom';
import usePortalContainer, {BBox} from "./usePortalContainer";
import useOuterClick from './useOuterClick';
import styles from './PortalContainer.module.scss';

export const PortalContainerContext = createContext({
   x: 0,
   y: 0,
   isShown: false,
   content: <></>,
   show: (isShown: boolean) => { return; },
   set: (options: BBox, content: ReactElement) => { return; }
});

const ContainerElement: React.FC<{}> = (props) => {
    const params = useContext(PortalContainerContext);
    let firstClick = false;
    const innerRef = useOuterClick((ev: any) => {
        if (!firstClick) {
            firstClick = true;
        } else {
            params.show(false);
        }
    });

    return createPortal(
      <div className={`${styles.portalContainer} ${params.isShown && styles.portalContainerVisible}`}
           style={{left: params.x + 'px', top: params.y + 'px'}}
           ref={innerRef as any}
      >
      {params.content}
      </div>, document.body);
};

const PortalContainer: React.FC <{}> = (props) => {
    const container = usePortalContainer();

    return (<PortalContainerContext.Provider value={{...container}}>
        <ContainerElement/>
        {props.children}
    </PortalContainerContext.Provider>);
};

export default PortalContainer;
