import 'babel-polyfill';
import 'bootstrap';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './styles/site.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { App } from '@src/app';
import { ErrorBoundary } from '@src/common/error/ErrorBoundary';
import * as RoutesModule from './routes';
let routes = RoutesModule.routes;

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing
  // configuration and injects the app into a DOM element.
  const app = new App();
  app.init();
  render(
    <AppContainer>
      <Provider {...app.stores}>
        <ErrorBoundary>
          <BrowserRouter children={routes}/>
        </ErrorBoundary>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept('./routes', () => {
    routes = require<typeof RoutesModule>('./routes').routes;
    renderApp();
  });
}