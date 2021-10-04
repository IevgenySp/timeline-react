import React from 'react';
import styles from './Timeline.module.scss';
import HeaderTiles from "../HeaderTiles";
import TilesMap from "../MapComponents/TilesMap";
import SettingsButton from "../HelperComponents/SettingsButton";
import travelData from './../../data_samples/december_travel';
import {travelDataDay} from '../../types/data';
import PortalContainer from "../HelperComponents/Containers/PortalContainer";

const Timeline: React.FC <{width: number, height: number, data?: Map<string | number, travelDataDay>}> = (props) => {
    const timelineData = props.data ? props.data : travelData;
    return (<div className={styles.timelineContainer}>
        <PortalContainer>
            <HeaderTiles width={props.width} height={props.height} data={timelineData}/>
            <TilesMap data={timelineData}/>
            <SettingsButton callback={() => {}} tabIndex={3}/>
        </PortalContainer>
    </div>);
};

export default Timeline;
