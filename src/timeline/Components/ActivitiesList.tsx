import React, {useContext, useEffect, useState} from 'react';
import {Activity as ActivityType} from '../types/data';
import configuration from '../configuration';
import {PortalContainerContext} from "./HelperComponents/Containers/PortalContainer";
import AutocompleteComponent from "./Autocomplete/AutocompleteComponent";
import styles from './ActivitiesList.module.scss';
import PlaceImage from '../images/place.svg';
import ActionImage from '../images/action.svg';
import NoteImage from '../images/note.svg';

const Activity: React.FC<{activity: string, type: string, id: string | number }> = (props) => {
    const [inProp, setInProp] = useState(false);
    //@ts-ignore
    const color: string = configuration.activitiesColors[props.type];

    useEffect(() => {
        setInProp(true);
    }, []);

    return (<div className={styles.activityContainer}>
        <div className={`${styles.activity} ${inProp && styles.activityEnterDone}`} style={{backgroundColor: color}} key={props.id}>
            {props.activity}
        </div>

  </div>);
};

const AddActivity: React.FC<{day: string | number}> = (props) => {
    const portalContext = useContext(PortalContainerContext);

    return (<div className={styles.addActivityContainer}>
        <button className={styles.addPlace} title='Add place' onClick={(e) => {
            portalContext.set({x: e.clientX, y: e.clientY}, <AutocompleteComponent day={props.day}/>);
            portalContext.show(true);
        }}>
            <img src={PlaceImage} title='Add place' alt='Add place'/>
        </button>
        <button className={styles.addAction} title='Add action'><img src={ActionImage} title='Add action' alt='Add action'/></button>
        <button className={styles.addNote} title='Add note'><img src={NoteImage} title='Add note' alt='Add note'/></button>
    </div>);
};

const ActivitiesList: React.FC <{data: ActivityType[]}> = (props) => {
    return (<div className={styles.activitiesList}>
        {props.data.map((item, index) => <Activity activity={item.name} type={item.type} key={index} id={index}/>)}
        <AddActivity day={props.data[0].dayId} />
    </div>);
};

export default ActivitiesList;
