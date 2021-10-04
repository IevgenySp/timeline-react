import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {days} from "../../timeline/data_samples/december_travel";
import { v4 as uuidv4 } from 'uuid';
import {Day} from "../../timeline/types/data";

export const daysSlice = createSlice({
    name: 'days',
    initialState: Object.fromEntries(days),
    reducers: {
        add: (state, action: PayloadAction<Day>) => {
            state[uuidv4()] = action.payload;
        },
        update: (state, action: PayloadAction<[string | number, Day]>) => {
            state[action.payload[0]] = action.payload[1];
        },
        remove: (state, action: PayloadAction<string | number>) => {
            delete state[action.payload];
        }
    },
});

// Action creators are generated for each case reducer function
export const { add, update, remove } = daysSlice.actions;

export default daysSlice.reducer;
