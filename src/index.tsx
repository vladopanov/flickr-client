// import './css/site.css';
// import 'bootstrap';
import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { App } from '@src/app';
import { ErrorBoundary } from '@src/common/error/ErrorBoundary';
import { MasterPage } from '@src/features/master-page/MasterPageView';

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing
  // configuration and injects the app into a DOM element.
  const app = new App();
  app.init();
  render(
    <AppContainer>
      <Provider {...app.stores}>
        <ErrorBoundary>
          <MasterPage />
        </ErrorBoundary>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept('./features/master-page/MasterPageView', () => renderApp());
}