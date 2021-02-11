import { createSelector } from 'reselect';
import { TimeSeries } from 'pondjs';
import { getMetrics } from '../metrics/selectors';
const state = (state: any) => state.measurements;

export const getSeries = createSelector(
  state,
  getMetrics,
  (state, metrics) => {
    return metrics.map((metric: any) => state[metric]);
  },
);

export const makeNumOfTodosWithIsDoneSelector = () =>
  createSelector(
    state,
    (_: any, metric: any) => metric,
    (measurements, metric) => {
      if (!measurements[metric]) return '---';
      return measurements[metric].atLast().get('value');
    },
  );

export const getTrafficSeries = createSelector(
  getSeries,
  series => {
    const trafficSeries = TimeSeries.timeSeriesListMerge({
      name: 'Metrics',
      seriesList: series || [],
    });
    return trafficSeries;
  },
);

export const getAxis = createSelector(
  getSeries,
  series => {
    const axis = series
      .filter((r: any) => r)
      .reduce((accum: any, elem: any) => {
        const unit = elem.atLast().get('unit');
        const existingElement = accum.find((a: any) => a.id === unit);
        if (!existingElement) {
          accum.push({
            id: unit,
            label: unit,
            min: elem.min(),
            max: elem.max(),
          });
        } else {
          const existingMin = elem.min();
          const existingMax = elem.max();
          existingElement.min = Math.min(existingElement.min, existingMin);
          existingElement.max = Math.max(existingElement.max, existingMax);
        }
        return accum;
      }, []);

    return axis;
  },
);
