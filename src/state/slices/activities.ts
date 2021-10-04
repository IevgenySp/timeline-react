import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {activities} from "../../timeline/data_samples/december_travel";
import { v4 as uuidv4 } from 'uuid';
import {Activity} from "../../timeline/types/data";

export const activitiesSlice = createSlice({
    name: 'activities',
    initialState: Object.fromEntries(activities),
    reducers: {
        add: (state, action: PayloadAction<Activity>) => {
            state[uuidv4()] = action.payload;
        },
        update: (state, action: PayloadAction<[string | number, Activity]>) => {
            state[action.payload[0]] = action.payload[1];
        },
        remove: (state, action: PayloadAction<(string | number)[]>) => {
            action.payload.forEach(id => {
                delete state[id];
            });
        }
    },
});

// Action creators are generated for each case reducer function
export const { add, update, remove } = activitiesSlice.actions;

export default activitiesSlice.reducer;
