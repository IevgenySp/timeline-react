import React from 'react';
import styles from './PrevNextButton.module.scss';
import NextImage from '../../images/next.svg';
import PrevImage from '../../images/prev.svg';

const PrevNextButton: React.FC <{isPrev: boolean, callback: () => void, tabIndex: number}> = (props) => {
    const buttonStyle = props.isPrev ? styles.prevButton : styles.nextButton;

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.callback();
        }
    };

    return (<div className={`${styles.prevNextButton}  ${buttonStyle}`}
                 role='button'
                 tabIndex={props.tabIndex}
                 onKeyDown={onKeyDown}
                 onClick={props.callback}>
        {props.isPrev && <img src={PrevImage} title='Previous' alt='Previous'/>}
        {!props.isPrev && <img src={NextImage} title='Next' alt='Next'/>}
    </div>);
};

export default PrevNextButton;
