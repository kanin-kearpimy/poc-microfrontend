import * as React from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { createPiral, PiletMetadata, Piral, renderInstance, SetRoute } from 'piral';
import { createContainersApi } from 'piral-containers';
import { TestPage } from './TestPage';
import { layout } from './layout';

function createCustomeApi () {
  return context => {
    return (api, meta: PiletMetadata) => ({
      mockTestData: 'mock-test-data'
    });
  };
}

const piral = createPiral({
  requestPilets() {
    return fetch('http://localhost:9000/api/v1/pilet')
      .then((res) => res.json())
      .then((res) => res.items);
  },
  plugins: [createCustomeApi(), createContainersApi()],
  extendApi: [createContainersApi()],
});

piral.root.setData('app-shell-set-data', 'APP SHELL set data.');

const app = (
  <Piral instance={piral}>
    <SetRoute path="/" component={() => <Redirect from="/" to="/products" />} />
  </Piral>
);

render(app, document.querySelector('#app'));
