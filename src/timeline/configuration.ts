

export type activitiesColorsType = {
  preparation?: string,
  airport?: string,
  documents?: string,
  airTravel?: string,
  groundTravel?: string,
  country?: string,
  city?: string,
  mountains?: string,
  rest?: string,
  excursion?: string,
  miscellaneous?: string
}

const config = {
  tileMinWidth: 200,
  mapMovementDuration: 1,
  mapInitialLatLong: [31.505, -0.09],
  activitiesColors: {
    /*preparation: '#7ab800',
    airport: '#f8dfc2',
    documents: '#0085c3',
    airTravel: '#71c6c1',
    groundTravel: '#dc5034',
    country: '#009bbb',
    city: '#ebffac',
    mountains: '#ffaaaa',
    rest: '#ffc107',
    excursion: '#c1f1fc',
    miscellaneous: '#ffc2e5',*/

    default: '#ffc107',
    place: '#009bbb',
    action: '#ffaaaa'
  }
};

export default config;
