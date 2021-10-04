import {useAppSelector, useAppDispatch} from "./default";
import {remove as removeDay} from '../slices/days';
import {remove as removeActivity} from '../slices/activities';
import {useCallback} from 'react';

export const useRemoveDay = () => {
    const dispatch = useAppDispatch();
    const activities = useAppSelector(state => state.activities);

    return useCallback((dayId: string | number) => {
        const toBeRemoved: string[] = [];

        Object.keys(activities).forEach((key: string) => {
            if (activities[key].dayId === dayId) {
                toBeRemoved.push(key);
            }
        });

        dispatch(removeActivity(toBeRemoved));
        dispatch(removeDay(dayId));
    }, []);
};
