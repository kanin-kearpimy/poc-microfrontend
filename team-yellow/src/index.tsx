import * as React from 'react';
import { PiletApi } from 'app-shell';
import { YellowPage } from './YellowPage';

var piral_data:String;

export function setup(app: PiletApi) {
  piral_data = app.getData('app-shell-set-data');
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

  app.registerPage('/yellow', ({ piral }) => {
    return(
      <><YellowPage BasketInfo={() => <piral.Extension name="basket-info" />} /></>
    )
  });

  const connect = app.createState({
    state: {
      count: 0,
    },
    actions: {
      increment(dispatch) {
        dispatch(state => ({
          count: state.count + 1,
        }));
      },
      decrement(dispatch) {
        dispatch(state => ({
          count: state.count - 1,
        }));
      },
    },
  });

  app.registerPage('/state', connect(({state, actions}) => {
    const mockTestData = app.mockTestData;
    return(
      <>
        Global State: {mockTestData}
        <div>
          <h3>Counter: {state.count}</h3>
          <button onClick={actions.increment}>Increase</button>
          <button onClick={actions.decrement}>Decrease</button>
        </div>
        <div>APPSHELL set data: {piral_data}</div>
      </>
    )
  }))
}
