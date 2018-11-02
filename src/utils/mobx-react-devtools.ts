import { createElement } from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';
import env from './env';

function enableDevtools() {
  require(['mobx-react-devtools'], mobxDevtools => {
    const wrapper = document.createElement('div');
    wrapper.id = 'mobx-devtools-wrapper';
    document.body.appendChild(wrapper);
    render(createElement(mobxDevtools.default, null), wrapper);
  });
}

export function useMobxDevTools(): void {
  if (env.isProduction()) {
    return;
  }

  configure({
    enforceActions: true,
    computedRequiresReaction: true,
    disableErrorBoundaries: true
  });
  enableDevtools();
}