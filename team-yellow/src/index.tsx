import * as React from 'react';
import { PiletApi } from 'app-shell';
import { YellowPage } from './YellowPage';

var piral_data: String;

export function setup(app: PiletApi) {
  app.setData('counter-data', 0);
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
    return (
      <>
        <YellowPage BasketInfo={() => <piral.Extension name="basket-info" />} />
      </>
    );
  });

  const connect = app.createState({
    state: {
      count: 0,
      countBySetData: app.getData('counter-data'),
    },
    actions: {
      increment(dispatch) {
        dispatch((state) => ({
          count: state.count + 1,
        }));
      },
      decrement(dispatch) {
        dispatch((state) => ({
          count: state.count - 1,
        }));
      },
      incrementBySetData(dispatch) {
        let tmp = app.getData('counter-data');
        tmp++;
        app.setData('counter-data', tmp);

        dispatch((state) => ({
          ...state,
          countBySetData: app.getData('counter-data'),
        }));
      },
      decreaseBySetData(dispatch) {
        let tmp = app.getData('counter-data');
        tmp--;
        app.setData('counter-data', tmp);

        dispatch((state) => ({
          ...state,
          countBySetData: app.getData('counter-data'),
        }));
      },
    },
  });

  app.registerPage(
    '/state',
    connect(({ state, actions, piral }) => {
      const mockTestData = app.mockTestData;
      return (
        <div className="main-layout royalblue-border">
          <div className="yellow-recos">Global State: {mockTestData}</div>
          <div className="yellow-recos">
            <div>
              <h3>Counter: {state.count}</h3>
              <button onClick={actions.increment}>Increase</button>
              <button onClick={actions.decrement}>Decrease</button>
            </div>
          </div>
          <div className="yellow-recos">
            <div>APPSHELL set data: {piral_data}</div>
          </div>
          <div className="yellow-recos">
            <div>Counter(Share data between module): {state.countBySetData}</div>
          </div>
          <div className="yellow-recos">
            <button onClick={actions.incrementBySetData}>Increase</button>
            <button onClick={actions.decreaseBySetData}>Decrease</button>
          </div>
          <piral.Extension name="black-layout" />
        </div>
      );
    }),
  );
}
