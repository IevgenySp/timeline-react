import React, {useState, useEffect} from 'react';
import L from 'leaflet';
import {LatLngExpression, Map as LeafletMap} from 'leaflet';
import 'leaflet-routing-machine';
import {MapContainer, MapConsumer, TileLayer, Marker, Popup} from 'react-leaflet';
import styles from './TilesMap.module.scss';
import './leaflet.css';
import 'leaflet/dist/leaflet.css';
import { LocationIQProvider } from 'leaflet-geosearch';
import { v4 as uuidv4 } from 'uuid';
import config from '../../configuration';
import axios from 'axios';

//import CityIcon from '../../images/city.svg';

// Import leaflet default icon
// https://stackoverflow.com/questions/40365440/react-leaflet-map-not-correctly-displayed
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import {travelDataDay} from "../../types/data";
import {useAppSelector} from "../../../state/hooks/default";

const locationIQApiKey = 'pk.1385a10e0ebd952d07b12de8cb02d5e0';
const mapBoxApiKey = 'pk.eyJ1IjoiaWV2Z2VuaWlqNyIsImEiOiJja3RsajQxNWkwZDdxMnVuMmt1dWNpZ3pnIn0.Y6aKJMU4QLVdv9JQr7dW_w';
const googleApiKey = 'AIzaSyDHk9CW6O_0-aJzHzIp9vvK4YsjjG5WLQ0';
const locationIQMap = 'https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=' + locationIQApiKey;
const mapboxMap = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapBoxApiKey;
const googleMap = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
//const osmMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapStyle = {
    height: '49vh',
    position: 'relative'
};

let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

/*const iconPerson = new L.Icon({
    iconUrl: CityIcon,
    iconRetinaUrl: CityIcon,
    iconAnchor: undefined,
    popupAnchor: undefined,
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});*/

const getIcon = (type: string) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color:#ffffff;' class='${styles.markerIcon}  ${styles[type + 'IconColor']}'></div>`,
        //iconSize: [30, 42],
        //iconAnchor: [15, 42],
        popupAnchor: [-2, -29]
    });
};

/*const createRoutineMachineLayer = (props: any) => {
    const waypointsRoute: any = [];

    props.route.forEach((points: any) => {
        waypointsRoute.push(L.latLng(points[0], points[1]));
    });

    const instance = L.Routing.control({
        waypoints: waypointsRoute,
        router: (L.Routing as any).mapbox(mapBoxApiKey),
        showAlternatives: true,
    });

    return instance;
};*/

//const RoutingMachine = createControlComponent(createRoutineMachineLayer);

const getPlaces = async (places: string[]) => {
    //const provider = new OpenStreetMapProvider();
    const provider = new LocationIQProvider({
        params: {
            key: locationIQApiKey,
        },
    });
    const placesArr: any = [];
    //let index = 0;

   /*const interval = setInterval(() => {
       provider.search({ query: places[index]}).then(result => {
           placesArr.push(result);
       });
       index++;

       if (index >= places.length) {
           clearInterval(interval);
       }
   }, 4000);*/

   for (let i = 0; i < places.length; i++) {
       await provider.search({ query: places[i]}).then(result => {
           placesArr.push(result);
       });
       await new Promise(r => setTimeout(r, 1000));
   }

   return placesArr;

    //const test =  await Promise.all(places.map(place => {
        //return provider.search({ query: place });
    //}));
};

const TilesMap: React.FC <{data: Map<string | number, travelDataDay>}> = (props) => {
    const [markers, setMarkers] = useState<any[]>([]);
    const [position, setPosition] = useState<LatLngExpression>(config.mapInitialLatLong as LatLngExpression);
    const statePlaces = useAppSelector(state => state.places);
    const zoom = 1.6;
    const supportedPlaces = ['city', 'country', 'continent', 'region', 'state', 'address'];
    let lfMap: LeafletMap | null = null;

    useEffect(() => {
        const markersArr = Object.values(statePlaces)
            .filter(place => place.lat && place.long).map((place, index) => {
                let type = 'default';

                if (place.type) {
                    type = supportedPlaces.indexOf(place.type) !== -1 ? place.type : 'default';
                }

                return (<Marker icon={getIcon(type) as any} key={uuidv4()}
                            position={[place.lat, place.long] as LatLngExpression}>
                    <Popup>
                        {place.address}
                    </Popup>
                </Marker>)
        });

        setMarkers(markersArr);
    }, [Object.keys(statePlaces).length, markers.length]);

    useEffect(() => {
        const places = Object.values(statePlaces);
        const lastPlace = places[places.length - 1];

        if (lastPlace.lat && lastPlace.long) {
            const newPosition: LatLngExpression = [lastPlace.lat as number, lastPlace.long as number];

            setPosition(newPosition);
            handleOnFlyTo(zoom, newPosition);
        }


        /*var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian&inputtype=textquery&locationbias=circle%3A2000%4047.6918452%2C-122.2226413&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyDHk9CW6O_0-aJzHzIp9vvK4YsjjG5WLQ0',
            headers: { }
        };

        //@ts-ignore
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });*/




    }, [Object.keys(statePlaces).length]);

    const handleOnFlyTo = (zoom: number, mapPosition?: LatLngExpression) => {
        if (lfMap !== null) {
            const pos = mapPosition ? mapPosition : position;

            lfMap.flyTo(pos, zoom, {
                duration: config.mapMovementDuration
            });
        }
    };

    return (<div className={styles.tilesMap}>
        <MapContainer center={position as LatLngExpression} zoom={zoom} scrollWheelZoom={false} style={mapStyle as any}>
            <MapConsumer>
                {(map) => {
                    lfMap = map;
                    //console.log('map center:', map.getCenter());
                    return null
                }}
            </MapConsumer>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={googleMap}
                maxZoom = {20}
                subdomains = {['mt0','mt1','mt2','mt3']}
            />
            {markers}
            {/*routes*/}
        </MapContainer>
    </div>);
};

export default TilesMap;

// url={locationIQMap}

//url={mapboxMap}
//id='mapbox/streets-v11'
//accessToken={mapBoxApiKey}

//url={'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'}
//maxZoom = {20}
//subdomains = {['mt0','mt1','mt2','mt3']}
