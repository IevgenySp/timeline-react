import React from 'react';
import styles from './ExpandCollapseButton.module.scss';
import ExpandImage from '../../images/expand.svg';
import CollapseImage from '../../images/collapse.svg';

const ExpandCollapseButton: React.FC <{isExpand: boolean, callback: () => void, tabIndex: number}> = (props) => {

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.callback();
        }
    };

    return (<div className={styles.expandCollapseButton}
                 role='button'
                 tabIndex={props.tabIndex}
                 onKeyDown={onKeyDown}
                 onClick={props.callback}>
        {props.isExpand && <img src={CollapseImage} title='Collapse' alt='Collapse'/>}
        {!props.isExpand && <img src={ExpandImage} title='Expand' alt='Expand'/>}
    </div>);
};

export default ExpandCollapseButton;
