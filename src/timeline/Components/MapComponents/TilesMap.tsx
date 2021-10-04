import React, {useState, useEffect} from 'react';
import L from 'leaflet';
import {LatLngExpression} from 'leaflet';
import 'leaflet-routing-machine';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import styles from './TilesMap.module.scss';
import './leaflet.css';
import 'leaflet/dist/leaflet.css';
import { LocationIQProvider } from 'leaflet-geosearch';
import { v4 as uuidv4 } from 'uuid';

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
const locationIQMap = 'https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=' + locationIQApiKey;
const mapboxMap = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapBoxApiKey;
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
    const statePlaces = useAppSelector(state => state.places);
    const position = [31.505, -0.09];
    const supportedPlaces = ['city', 'country', 'continent', 'region', 'state', 'address'];

    useEffect(() => {
        const markersArr = Object.values(statePlaces).filter(place => place.lat && place.long).map(place => {
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

    return (<div className={styles.tilesMap}>
        <MapContainer center={position as LatLngExpression} zoom={1.6} scrollWheelZoom={false} style={mapStyle as any}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={locationIQMap}
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
