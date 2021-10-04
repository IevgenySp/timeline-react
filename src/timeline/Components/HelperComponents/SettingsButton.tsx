import React from 'react';
import styles from './SettingsButton.module.scss';
import SettingsImage from '../../images/settings.svg';

const SettingsButton: React.FC <{callback: () => void, tabIndex: number}> = (props) => {
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.callback();
        }
    };

    return (<div className={styles.settingsButton}
                 role='button'
                 tabIndex={props.tabIndex}
                 onKeyDown={onKeyDown}
                 onClick={props.callback}>
        <img src={SettingsImage} title='Settings' alt='Settings'/>
    </div>);
};

export default SettingsButton;
