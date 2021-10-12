import * as React from 'react';
import { PiletApi } from 'app-shell';

interface BlackExtension {}

var counterG: number;

export function setup(app: PiletApi) {
  counterG = app.getData('counter-data');
  app.on('store-data', ({ name, value }) => {
    if (name === 'counter-data') {
      console.log(`New value is "${value}"!`);
      counterG = value;
    }
  });

  const connect = app.createState({
    state: {},
    actions: {},
  });

  app.registerExtension<BlackExtension>(
    'black-layout',
    connect(({ actions }) => (
      <>
        <div className="black-recos">Display by team black: {counterG}</div>
      </>
    )),
  );
}
