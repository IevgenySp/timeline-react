import React, {MouseEvent, useRef, useState} from 'react';
import {debounce} from 'lodash';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import Paper from '@material-ui/core/Paper';
import styles from './AutocompleteComponent.module.scss';
import {useAppDispatch} from "../../../state/hooks/default";
import {add as addPlace} from "../../../state/slices/places";
import {add as addActivity} from "../../../state/slices/activities";
import { v4 as uuidv4 } from 'uuid';

const autocompleteBackground = '#fdd231';

export type LocationIqAutocomplete = {
    place_id: number | string,
    display_name: string,
    type: string,
    address: {
        country: string
    },
    lat: string,
    lon: string
}

export type Place = {
    id: number | string,
    placeId?: number | string,
    label?: string,
    type?: string,
    country: string,
    address?: string,
    lat?: string,
    long?: string
};

export const ComboBox: React.FC <{day: string | number}> = (props) => {
    const locationIQApiKey = 'pk.1385a10e0ebd952d07b12de8cb02d5e0';
    const inputRef = useRef<HTMLInputElement>(null);
    const [places, setPlaces] = useState<Place[]>([]);
    const [queryStr, setQueryStr] = useState('');
    const debounceDelay = 1000;
    const dispatch = useAppDispatch();

    const keyDownHandler = debounce((e) => {
        const qstring = e.target.value;

        if (qstring.length >= 3) {
            fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${locationIQApiKey}&q=${qstring}&limit=5`)
                .then(response => response.json())
                .then((data) => {
                    const newPlaces: Place[] = [];

                    if (data && data.length) {
                        data.forEach((place: LocationIqAutocomplete) => {
                            newPlaces.push({
                                id: place.place_id,
                                label: place.display_name,
                                type: place.type,
                                country: place.address.country,
                                lat: place.lat,
                                long: place.lon
                            })
                        });
                    }

                    setPlaces(newPlaces);
                });
        }

        setQueryStr(qstring);
    }, debounceDelay);

    const clickHandler = (e: MouseEvent) => {
        // @ts-ignore
        const placeId = e.target.parentElement.dataset.placeid;

        if (placeId) {
            const place = places.find(place => place.id === placeId);

            if (place) {
                const newPlace = {
                    id: place.id,
                    type: place.type,
                    placeId: place.id,
                    country: place.country,
                    address: place.label,
                    lat: place.lat,
                    long: place.long
                };
                const newActivity = {
                    id: uuidv4(),
                    dayId: props.day,
                    type: 'place',
                    placeId: place.id,
                    name: place.label as string
                };

                dispatch(addPlace(newPlace));
                dispatch(addActivity(newActivity));
                setPlaces([]);
            }
        }
    };

    return (
        <Autocomplete
            onChange={() => console.log('test')}
            PaperComponent={({ children }) => (
                <Paper style={{ background: autocompleteBackground }}>{children}</Paper>
            )}
            disablePortal
            id="combo-box-input"
            options={places}
            sx={{ width: 300 }}
            renderOption={(props, option) => {
                const { label, type, id } = option;

                return (<div key={id} data-placeid={id as string} className={styles.autocompleteTextLine} onClick={clickHandler}>
                    <div className={styles.autocompleteTextLineLabel}>{label}</div>
                    <div className={styles.autocompleteTextLineType}>{type}</div>
                </div>)
            }}

            renderInput={(params) => <TextField {...params} ref={inputRef} label="Where to?" onChange={(e) => keyDownHandler(e)}/>}
        />
    );
};

const AutocompleteComponent: React.FC <{day: string | number}> = (props) => {
    return (<div className={styles.autocompleteContainer}>
        <ComboBox day={props.day}/>
    </div>);
};

export default AutocompleteComponent;
