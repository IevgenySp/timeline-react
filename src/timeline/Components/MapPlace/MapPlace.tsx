import React, {useState, useEffect, useCallback, useContext} from 'react';
import styles from './MapPlace.module.scss';
import {Place, PlaceTypes} from "../../types/data";

const MapPlace: React.FC <{place: Place}> = (props) => {
    const [imageSrc, setImageSrc] = useState('');

    const getPlace = useCallback(() => {
        const getPlaceData = (placeId: string) => {
            fetch(window.location.href + 'api/googleplacedetails/json/' + placeId)
                .then(response => response.json())
                .then(data => {
                    const photoId = data.result.photos[0].photo_reference;

                    fetch(window.location.href + 'api/googleplacephotos/400/' + photoId)
                        .then(response => response.arrayBuffer())
                        //.then(response => response.blob())
                        .then(data => {
                            //setImageSrc(URL.createObjectURL(data))

                            //@ts-ignore
                            setImageSrc(Buffer.from(data, 'binary').toString('base64'));
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        };

        /*fetch(window.location.href + `api/googleplacenearby/json/${props.place.lat + '%2C' + props.place.long}/1500/${props.place.address}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));*/

        switch (props.place.type) {
            default:
                fetch(window.location.href + `api/googleplacereversegeocode/json/${props.place.lat + ',' + props.place.long}`)
                    .then(response => response.json())
                    .then(data => {
                        const placeId = data.results[0].place_id;

                        getPlaceData(placeId)
                    })
                    .catch(error => console.log(error));
                break;
            case PlaceTypes.Continent:
            case PlaceTypes.Region:
            case PlaceTypes.Country:
            case PlaceTypes.City:
            case PlaceTypes.State:
            case PlaceTypes.InternationalOrganization:
            case PlaceTypes.Village:
                fetch(window.location.href + `api/googleplace/json/${props.place.address}/textquery`)
                    .then(response => response.json())
                    .then(data => {
                        const placeId = data.candidates[0].place_id;

                        getPlaceData(placeId)
                    })
                    .catch(error => console.log(error));
        }
    }, []);

    useEffect(() => {
        getPlace();
    }, []);

    /*const getPlace = () => {
        const outputFormat = 'json';
        const input = 'Australia';
        const inputType = 'textquery';
        const key = 'AIzaSyDHk9CW6O_0-aJzHzIp9vvK4YsjjG5WLQ0';
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/${outputFormat}?input=${input}`;

        fetch(url)
            .then(response => response.json())
            .then((data) => {
               console.log(data);
            });
    };*/

    return (<div className={styles.mapPlace}>
        <img className={styles.mapPlacePhoto} src={"data:image/png;base64,"+imageSrc} alt={props.place.address} />
        <div className={styles.mapPlaceAddress}>{props.place.address}</div>
    </div>);
};

export default MapPlace;
