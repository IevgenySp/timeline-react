import { configureStore } from '@reduxjs/toolkit';
import daysReducer from './slices/days';
import placesReducer from './slices/places';
import activitiesReducer from './slices/activities';

const store = configureStore({
    reducer: {
        days: daysReducer,
        places: placesReducer,
        activities: activitiesReducer
    }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
