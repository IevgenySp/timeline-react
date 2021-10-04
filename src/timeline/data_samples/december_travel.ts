import { v4 as uuidv4 } from 'uuid';
import {Days, Places, Activities} from "../types/data";

const days: Days = new Map();

const day1Id = uuidv4();
const day2Id = uuidv4();
const day3Id = uuidv4();
const day4Id = uuidv4();
const day5Id = uuidv4();
const day6Id = uuidv4();
const day7Id = uuidv4();

days.set(day1Id, {id: day1Id, date: 1631566800000});
days.set(day2Id, {id: day2Id, date: 1631653200000});
days.set(day3Id, {id: day3Id, date: 1631739600000});
days.set(day4Id, {id: day4Id, date: 1631826000000});
days.set(day5Id, {id: day5Id, date: 1631912400000});
days.set(day6Id, {id: day6Id, date: 1631998800000});
days.set(day7Id, {id: day7Id, date: 1632430800000});

const places: Places = new Map();

const place0Id = uuidv4();
const place1Id = uuidv4();
const place2Id = uuidv4();
const place3Id = uuidv4();
const place4Id = uuidv4();

places.set(place0Id, {id: place0Id, type: 'address', region: 'Europe', country: 'Ukraine', city: 'Kiev', address: 'Pobedy ave.89a', lat: 50.456524, long: 30.3829943});
places.set(place1Id, {id: place1Id, type: 'city', region: 'South America', country: 'Argentina', city: 'Ushuaia', isInitial: true, lat: -54.806843, long: -68.3728428});
places.set(place2Id, {id: place2Id, type: 'continent', region: 'Antarctic', geographicalItem: 'Antarctica', lat: -76.299965, long: -148.003021});
places.set(place3Id, {id: place3Id, type: 'address', region: 'South America', country: 'Argentina', city: 'Ushuaia', address: 'Gdor. Deloqui 1355, V9410 Ushuaia, Tierra del Fuego, Аргентина', lat: -54.8085274, long: -68.3193612});
places.set(place4Id, {id: place4Id, type: 'adress', region: 'South America', country: 'Argentina', city: 'Ushuaia', address: 'Av Gral, Av. San Martín 309, V9410 Ushuaia, Tierra del Fuego, Аргентина', lat: -54.8056705, long: -68.3050313});

const activities: Activities = new Map();

const activity0Id = uuidv4();
const activity1Id = uuidv4();
const activity2Id = uuidv4();

activities.set(activity0Id, {
    id: activity0Id,
    dayId: day1Id,
    type: 'default',
    name: 'Pack my bag',
    description: 'Do not forget sun cream!',
    timeboxed: true,
    startTime: 1640250000000,
    duration: 7200000
});
activities.set(activity1Id, {
    id: activity1Id,
    dayId: day1Id,
    type: 'action',
    actionType: 'airport',
    name: 'Go to airport',
    timeboxed: true,
    startTime: 1640257200000,
    duration: 3600000
});
activities.set(activity2Id, {
    id: activity2Id,
    dayId: day1Id,
    type: 'action',
    actionType: 'flight',
    name: 'Flight to Argentina',
    timeboxed: true,
    startTime: 1640268000000,
    duration: 43200000
});

const activity3Id = uuidv4();
const activity4Id = uuidv4();

activities.set(activity3Id, {
    id: activity3Id,
    dayId: day2Id,
    type: 'action',
    actionType: 'airport',
    name: 'Pass custom',
    timeboxed: true,
    startTime: 1640329200000,
    duration: 3600000
});
activities.set(activity4Id, {
    id: activity4Id,
    dayId: day2Id,
    type: 'default',
    name: 'Depart to the hotel'
});

const activity5Id = uuidv4();
const activity6Id = uuidv4();
const activity7Id = uuidv4();
const activity8Id = uuidv4();

activities.set(activity5Id, {
    id: activity5Id,
    dayId: day3Id,
    type: 'action',
    actionType: 'excursion',
    name: 'Sity walk',
    timeboxed: true,
    startTime: 1640329200000,
    duration: 3600000
});
activities.set(activity6Id, {
    id: activity6Id,
    dayId: day3Id,
    type: 'place',
    placeId: place3Id,
    name: 'Visit restaurant',
    timeboxed: true,
    dateSensitive: true,
    placeSensitive: true,
    startTime: 1640329200000,
    duration: 3600000
});
activities.set(activity7Id, {
    id: activity7Id,
    dayId: day3Id,
    type: 'action',
    actionType: 'excursion',
    name: 'Go on mountain excursion',
    timeboxed: true,
    startTime: 1640329200000,
    duration: 3600000
});
activities.set(activity8Id, {
    id: activity8Id,
    dayId: day3Id,
    type: 'place',
    placeId: place4Id,
    name: 'Send postcards',
    timeboxed: true,
    dateSensitive: true,
    placeSensitive: true,
    startTime: 1640329200000,
    duration: 3600000
});

const activity9Id = uuidv4();
const activity10Id = uuidv4();

activities.set(activity9Id, {
    id: activity9Id,
    dayId: day4Id,
    type: 'action',
    actionType: 'excursion',
    name: 'Sity walk',
    timeboxed: true,
    startTime: 1640329200000,
    duration: 3600000
});
activities.set(activity10Id, {
    id: activity10Id,
    dayId: day4Id,
    type: 'action',
    actionType: 'excursion',
    name: 'Go on mountain excursion',
    timeboxed: true,
    startTime: 1640329200000,
    duration: 3600000
});

const activity11Id = uuidv4();
const activity12Id = uuidv4();

activities.set(activity11Id, {
    id: activity11Id,
    dayId: day5Id,
    type: 'default',
    name: 'Go to liner',
    timeboxed: true,
    startTime: 1640329200000,
    duration: 3600000
});
activities.set(activity12Id, {
    id: activity12Id,
    dayId: day5Id,
    type: 'action',
    actionType: 'cruise',
    name: 'Liner cruise to Antarctida',
    timeboxed: true,
    startTime: 1640329200000,
    duration: 3600000
});

const activity13Id = uuidv4();

activities.set(activity13Id, {
    id: activity13Id,
    dayId: day6Id,
    type: 'action',
    actionType: 'cruise',
    name: 'Antarctida journey',
    timeboxed: true,
    startTime: 1640329200000,
    duration: 3600000
});

const activity14Id = uuidv4();

activities.set(activity14Id, {
    id: activity14Id,
    dayId: day7Id,
    type: 'place',
    placeId: place2Id,
    name: 'Antarctida journey',
    timeboxed: true,
    dateSensitive: true,
    placeSensitive: true,
    startTime: 1640329200000,
    duration: 3600000
});


export {days, places, activities};







const travelData = new Map();

travelData.set(1631566800000, [
    {
        id: uuidv4(),
        country: 'Ukraine',
        city: 'Kiev',
        activity: 'Pack my bag',
        type: 'preparation',
        startTime: 1640250000000,
        duration: 7200000
    },
    {
        id: uuidv4(),
        country: 'Ukraine',
        city: 'Kiev',
        activity: 'Go to airport',
        type: 'airport',
        startTime: 1640257200000,
        duration: 3600000
    },
    {
        id: uuidv4(),
        country: 'Ukraine',
        city: 'Kiev',
        activity: 'Flight to Argentina',
        type: 'airTravel',
        startTime: 1640268000000,
        duration: 43200000
    },
]);

travelData.set(1631653200000, [
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Pass custom',
        type: 'airport',
        startTime: 1640329200000,
        duration: 3600000
    },
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Depart to the hotel',
        type: 'city',
        startTime: 1640336400000,
        duration: 7200000
    },
]);

travelData.set(1631739600000, [
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Sity walk',
        type: 'excursion',
        startTime: 1640329200000,
        duration: 3600000
    },
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Visit restaurant',
        type: 'rest',
        startTime: 1640329200000,
        duration: 3600000
    },
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Go on mountain excursion',
        type: 'mountains',
        startTime: 1640329200000,
        duration: 3600000
    },
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Send postcards',
        type: 'miscellaneous',
        startTime: 1640329200000,
        duration: 3600000
    }
]);

travelData.set(1631826000000, [
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Sity walk',
        type: 'excursion',
        startTime: 1640329200000,
        duration: 3600000
    },
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Go on mountain excursion',
        type: 'mountains',
        startTime: 1640329200000,
        duration: 3600000
    },
]);

travelData.set(1631912400000, [
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Go to liner',
        type: 'miscellaneous',
        startTime: 1640329200000,
        duration: 3600000
    },
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Liner cruise to Antarctida',
        type: 'miscellaneous',
        startTime: 1640329200000,
        duration: 3600000
    },
]);

travelData.set(1631998800000, [
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Antarctida journey',
        type: 'miscellaneous',
        startTime: 1640329200000,
        duration: 3600000
    },
]);

travelData.set(1632085200000, [
    {
        id: uuidv4(),
        country: 'Argentina',
        city: 'Ushuaia',
        activity: 'Antarctida journey',
        type: 'miscellaneous',
        startTime: 1640329200000,
        duration: 3600000
    },
]);

export default travelData;
