export type travelDataItem = {
    id: number,
    country: string,
    city: string,
    activity: string,
    type: string,
    startTime?: number | string,
    duration?: number | string
}

export type travelDataDay = travelDataItem[];

export type travelDataMap = Map<number | string, travelDataDay>;




export type Day = {
    id: number | string;
    date: number;
}
export type Days = Map<number | string, Day>;

export type PlaceTypes = 'continent' | 'region' | 'country' | 'village' | 'home' | 'house' |
    'forest' | 'mountains' | 'entertainment' | 'rest' | 'sport' | 'transport' | 'postoffice' |
    'clinic' | 'waterfall' | 'theatre' | 'bank' | 'pool' | 'monument' | 'park'
export type Place = {
    id: number | string;
    placeId?: number | string;
    region?: string,
    country?: string,
    city?: string,
    address?: string,
    geographicalItem?: string,
    lat?: number | string,
    long?: number | string,
    type?: string
    isInitial?: boolean
}
export type Places = Map<number | string, Place>;

export type ActivityTypes = 'default' | 'place' | 'action';
export type ActivityDefault = {
    id: number | string;
    dayId: number | string,
    type: string,
    name: string,
    description?: string,
    timeboxed?: boolean,
    startTime?: number,
    duration?: number
}

export type ActivityPlace = {
    id: number | string;
    dayId: number | string,
    type: string,
    placeId: number | string,
    name: string,
    description?: string,
    timeboxed?: boolean,
    startTime?: number,
    duration?: number
    dateSensitive?: boolean,
    placeSensitive?: boolean
}

export type ActivityActionSubType = 'airport' | 'flight' | 'excursion' | 'cruise'
export type ActivityAction = {
    id: number | string;
    dayId: number | string,
    type: string,
    actionType: ActivityActionSubType,
    name: string,
    description?: string,
    timeboxed?: boolean,
    startTime?: number,
    duration?: number
    dateSensitive?: boolean,
    placeSensitive?: boolean
}

export type Activity = ActivityDefault | ActivityPlace | ActivityAction;

export type Activities = Map<number | string, Activity>;
