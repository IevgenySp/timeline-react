import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import moment from 'moment';
import Tile from './Tile';
import PrevNextButton from './HelperComponents/PrevNextButton';
import {travelDataDay} from '../types/data';
import config from '../configuration';
import styles from './HeaderTiles.module.scss';
import ExpandCollapseButton from "./HelperComponents/ExpandCollapseButton";
import {useAppSelector} from "../../state/hooks/default";

type Elements = {
    visible: (string | number)[],
    hiddenRight: (string | number)[],
    hiddenLeft: (string | number)[]
}

const defineVisibleElements = (data: (string | number)[], minWidth: number, startTile: string | number, reverseDirection?: boolean): Elements => {
    const windowWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    const elements: Elements = {
      visible: [],
      hiddenRight: [],
      hiddenLeft: []
    };

    if (data.length * minWidth < windowWidth) {
        elements.visible = data;
    } else if (windowWidth < minWidth) {
        elements.visible.push(data[0]);
    } else {
        const maxElements = Math.floor(windowWidth / minWidth);
        let startTitleIndex = data.indexOf(startTile);

        if (!reverseDirection) {
            const lastIndex = data.length - 1;
            const lengthDiff = lastIndex - (startTitleIndex + maxElements - 1);

            if (lengthDiff < 0) {
                startTitleIndex = startTitleIndex - Math.abs(lengthDiff);
            }

            data.forEach((item, index) => {
                if (index >= startTitleIndex && index <= startTitleIndex + maxElements - 1) {
                    elements.visible.push(item);
                } else if (index < startTitleIndex) {
                    elements.hiddenLeft.push(item);
                } else {
                    elements.hiddenRight.push(item);
                }
            });
        } else {
            let sIndex = startTitleIndex - maxElements + 1;

            if (sIndex < 0) sIndex = 0;

            data.forEach((item, index) => {
                if (index >= sIndex && index <= sIndex + maxElements - 1) {
                    elements.visible.push(item);
                } else if (index < sIndex) {
                    elements.hiddenLeft.push(item);
                } else {
                    elements.hiddenRight.push(item);
                }
            });
        }
    }

    return elements;
};

const HeaderTiles: React.FC <{width?: number, height?: number, data: Map<string | number, travelDataDay>}> = (props) => {
    const days = _.chain(Object.values(useAppSelector(state => state.days)))
        .uniqBy('date').sortBy(['date']).value();
    const daysKeys: (number | string)[] = days.map(day => day.date);
    const minWidth = config.tileMinWidth;
    const [splittedTiles, setSplittedTiles] = useState(defineVisibleElements(daysKeys, minWidth, daysKeys[0]));
    const [currentDayTime, setCurrentDayTime] = useState<number>();
    const [expand, setExpand] = useState(false);

    const tiles = days
        .filter(item => splittedTiles.visible.indexOf(item.date) !== -1)
        .map(item => {
            let isCurrentDay = moment(item.date).isSame(currentDayTime, 'day');

            return <Tile id={item.date} key={item.date} data={item} isActive={isCurrentDay} currentDayTime={currentDayTime}/>;
    });

    useEffect(() => {
        const maxDate = _.max(daysKeys) || Date.now();

        if (Date.now() < maxDate) {
            const intervalJob = setInterval(() => {
                if (Date.now() < maxDate) {
                    setCurrentDayTime(Date.now());
                } else {
                    clearInterval(intervalJob);
                }
            }, 60000);
        }

    }, []);

    useEffect(() => {
        if (props.width && props.height) {
            const initialElement = splittedTiles.visible[0];
            const sTiles = defineVisibleElements(daysKeys, minWidth, initialElement);

            setSplittedTiles(prevState => ({
                ...prevState,
                visible: sTiles.visible,
                hiddenLeft: sTiles.hiddenLeft,
                hiddenRight: sTiles.hiddenRight
            }));
        }
    }, [props.width, props.height]);

    const clickRight = () => {
      const initialElement = splittedTiles.hiddenRight[0];
      const sTiles = defineVisibleElements(daysKeys, minWidth, initialElement);

      setSplittedTiles(prevState => ({
          ...prevState,
          visible: sTiles.visible,
          hiddenLeft: sTiles.hiddenLeft,
          hiddenRight: sTiles.hiddenRight
      }));
    };

    const clickLeft = () => {
        const initialElement = splittedTiles.hiddenLeft[splittedTiles.hiddenLeft.length - 1];
        const sTiles = defineVisibleElements(daysKeys, minWidth, initialElement, true);

        setSplittedTiles(prevState => ({
            ...prevState,
            visible: sTiles.visible,
            hiddenLeft: sTiles.hiddenLeft,
            hiddenRight: sTiles.hiddenRight
        }));
    };

    const clickExpand = () => {
      setExpand(!expand);
    };

    return (<div className={`${styles.headerTiles} ${expand ? styles.headerTilesExpanded : styles.headerTilesCollapsed}`}>
        {splittedTiles.hiddenLeft.length > 0 && <PrevNextButton isPrev={true} callback={clickLeft} tabIndex={0} />}
        {tiles}
        {splittedTiles.hiddenRight.length > 0 && <PrevNextButton isPrev={false} callback={clickRight} tabIndex={1} />}
        <ExpandCollapseButton isExpand={expand} callback={clickExpand} tabIndex={2}/>
    </div>);
};

export default HeaderTiles;
