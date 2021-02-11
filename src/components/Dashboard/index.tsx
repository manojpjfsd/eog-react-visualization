import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chart from './Chart';
import Metric from './Metric';
import Subscriber from './Subscriber';
import MetricSelection from './MetricSelection';
import { useDispatch, useSelector } from 'react-redux';
import Packs from '../../store/packs';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
  },
  header: {
    display: 'flex',
    width: '100%',
  },
  metrics: {
    width: '60%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  selection: {
    width: '40%',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const setMetrics = (metrics: any) => dispatch({ type: Packs.metrics.actions.METRICS_RECEIVED, metrics });
  const metrics = useSelector(Packs.metrics.selectors.getMetrics);

  return (
    <div className={classes.wrapper}>
      <Subscriber />
      <div className={classes.header}>
        <div className={classes.metrics}>
          {metrics.map((m: any, i: any) => (
            <Metric metric={m} key={i} />
          ))}
        </div>
        <div className={classes.selection}>
          <MetricSelection selectedMetrics={metrics} setMetrics={setMetrics} />
        </div>
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;
