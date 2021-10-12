import React, {MouseEvent, useContext, useRef, useState, useEffect} from 'react';
import {debounce} from 'lodash';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import Paper from '@material-ui/core/Paper';
import styles from './AutocompleteComponent.module.scss';
import {useAppDispatch} from "../../../state/hooks/default";
import {add as addPlace} from "../../../state/slices/places";
import {add as addActivity} from "../../../state/slices/activities";
import { v4 as uuidv4 } from 'uuid';
import {PortalContainerContext} from "../HelperComponents/Containers/PortalContainer";
import MapPlace from "../MapPlace/MapPlace";

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
    const [loading, setLoading] = useState(true);
    const debounceDelay = 1000;
    const dispatch = useAppDispatch();
    const portalContext = useContext(PortalContainerContext);

    useEffect(() => {
    }, [queryStr]);

    const keyDownHandler = debounce((e) => {
        const qstring = e.target.value.trim();

        setLoading(true);

        if (qstring.length >= 3 && qstring !== queryStr) {
            /*fetch(window.location.href + 'api/googleplaceautocomplete/json/' + qstring)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        setLoading(false);
                    }
                })
                .then((data) => {
                    const newPlaces: Place[] = [];

                    if (data && data.results && data.results.length) {
                        data.results.forEach((place: any) => {
                            newPlaces.push({
                                id: place.place_id,
                                label: place.formatted_address,
                                type: place.types[0],
                                country: '',
                                lat: place.geometry.location.lat,
                                long: place.geometry.location.lng
                            })
                        });
                    }

                    setPlaces(newPlaces);
                });*/

            fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${locationIQApiKey}&q=${qstring}&limit=10`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        setLoading(false);
                    }
                })
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

                const showPlaceDetails = () => {
                    portalContext.set({right: 0, top: '50.8vh'}, <MapPlace place={newPlace}/>, false);
                    portalContext.show(true);
                };

                // Delay to preseve animation capabilities
                setTimeout(showPlaceDetails, 500);
            }
        }
    };

    return (
        <Autocomplete
            onChange={() => console.log('test')}
            onInputChange={(e) => keyDownHandler(e)}
            loading={loading}
            filterOptions={x => x} // Necessary to prevent wrong filtering options behaviour!
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

            renderInput={(params) => <TextField {...params} ref={inputRef} label="Where to?"/>}
        />
    );
};

const AutocompleteComponent: React.FC <{day: string | number}> = (props) => {
    return (<div className={styles.autocompleteContainer}>
        <ComboBox day={props.day}/>
    </div>);
};

export default AutocompleteComponent;
