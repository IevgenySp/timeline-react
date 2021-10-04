import React, {useCallback, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import ActivitiesList from './ActivitiesList';
import styles from './Tile.module.scss';
import {Activity, Day, Place} from '../types/data';
import {useAppSelector} from "../../state/hooks/default";
import CountryImage from '../images/country.svg';
import CityImage from '../images/city.svg';

const Tile: React.FC <{id: string | number, data: Day, isActive?: boolean, currentDayTime?: number}> = (props) => {
    const activities = Object.values(useAppSelector(state => state.activities))
        .filter((activity: Activity) => activity.dayId === props.data.id);
    const places = useAppSelector(state => state.places);
    const countries: string[] = [];
    const cities: string[] = [];
    const tileRef = useRef<HTMLInputElement>(null);
    const [currentPosition, setCurrentPosition] = useState<number>();

    activities.forEach((item: any) => {
       if (item.type === 'place') {
           const place = places[item.placeId];
           place && place.country && countries.indexOf(place.country) === -1 && countries.push(place.country);
           place && place.city && cities.indexOf(place.city) === -1 && cities.push(place.city);
       }
    });

    // Set initial country or city when no any places set
    if (countries.length === 0 && cities.length === 0) {
        const initialPlace = Object.values(places).find((place: Place) => place.isInitial);

        initialPlace && initialPlace.country && countries.push(initialPlace.country);
        initialPlace && initialPlace.city && cities.push(initialPlace.city);
    }

    const timeIndicatorPosition = useCallback(() => {
        if (tileRef && tileRef.current) {
            const width = tileRef.current.getBoundingClientRect().width;
            const minutesInDay = 1440;
            const minutesPassed = moment.duration(moment().diff(props.data.date)).asMinutes();

            return Math.round((width * minutesPassed) / minutesInDay);
        }
    }, []);

    useEffect(() => {
        if (props.isActive) {
            setCurrentPosition(timeIndicatorPosition())
        }
    }, [props.currentDayTime]);

    return (<div className={styles.tileContainer}>
        <div ref={tileRef} className={`${styles.tile} ${props.isActive && styles.activeTile}`} key={props.id}>
        <div className={styles.tileDate}>{moment(props.data.date).format('dddd,MMMM,Do')}</div>
        {countries.length > 0 && <div className={styles.tileLabels}>
            <img src={CountryImage} title='Country' alt='Country'/>
            {countries.reduce((item, next) => item + ',' + next)}
        </div>}
        {cities.length > 0 && <div className={styles.tileLabels}>
            <img src={CityImage} title='City' alt='City'/>
            {cities.reduce((item, next) => item + ',' + next)}
        </div>}
        {props.isActive && <div className={styles.timeIndicator} style={{left: currentPosition + 'px'}}>
            <div className={styles.timeIndicatorLine} />
        </div>}
    </div>
    <ActivitiesList data={activities}/>
    </div>);
};

export default Tile;
