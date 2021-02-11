import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import AppDrawer from './components/AppDrawer';
import Wrapper from './components/Wrapper';
//import NowWhat from './components/NowWhat';
import Content from './components/Content';
import Dashboard from './components/Dashboard';
import { Route } from 'react-router-dom';
import { Provider as UrqlProvider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { ConnectedRouter } from 'connected-react-router';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const { store, history } = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const subscriptionClient = new SubscriptionClient(
  `${process.env.NODE_ENV === 'production' ? 'wss' : 'ws'}://react.eogresources.com/graphql`,
  {
    reconnect: true,
    timeout: 20000,
  },
);

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Wrapper>
          <AppDrawer />
          <UrqlProvider value={client}>
            <Content>
              <Route path="/dashboard" exact component={Dashboard} />
            </Content>
          </UrqlProvider>
          <ToastContainer />
        </Wrapper>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
);

export default App;
