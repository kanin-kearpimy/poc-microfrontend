import * as React from 'react';
import { PiletApi } from 'app-shell';
import { YellowPage } from './YellowPage';

var globalvalue:Number; 

export function setup(app: PiletApi) {
  globalvalue = app.getData('some-data');
  console.log(`Current value is "${globalvalue}"!`);

  app.on('store-data', ({ name, value }) => {
    if (name === 'some-data') {
      console.log(`New value is "${value}"!`);
      globalvalue = value;
    }
  });

  app.showNotification('Hello from Piral!', {
    autoClose: 2000,
  });
  app.registerMenu(() => (
    <a href="https://docs.piral.io" target="_blank">
      Documentation
    </a>
  ));
  app.registerTile(() => <div>Welcome to Piral!</div>, {
    initialColumns: 2,
    initialRows: 1,
  });

  app.registerPage('/yellow', ({ piral }) => <><YellowPage BasketInfo={() => <piral.Extension name="basket-info" />} /> </>);
}
