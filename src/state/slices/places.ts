import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {places} from "../../timeline/data_samples/december_travel";
import {Place} from "../../timeline/types/data";

export const placesSlice = createSlice({
    name: 'places',
    initialState: Object.fromEntries(places),
    reducers: {
        add: (state, action: PayloadAction<Place>) => {
            state[action.payload.id] = action.payload;
        },
        update: (state, action: PayloadAction<[string | number, Place]>) => {
            state[action.payload[0]] = action.payload[1];
        },
        remove: (state, action: PayloadAction<string | number>) => {
            delete state[action.payload];
        }
    },
});

// Action creators are generated for each case reducer function
export const { add, update, remove } = placesSlice.actions;

export default placesSlice.reducer;
