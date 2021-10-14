import * as React from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { createPiral, PiletMetadata, Piral, SetRoute, useActions, GlobalStateContext, renderInstance } from 'piral';
import { createContainersApi } from 'piral-containers';
import { layout, errors } from './layout';

function createCustomeApi () {
  return context => {
    return (api, meta: PiletMetadata) => ({
      mockTestData: 'mock-test-data',
      getUser: () => {   
        const { readState, dispatch } = useActions();
        const userObj = readState(m => m.app.user) 
        return userObj
      }
    });
  };
}


// app-shell share function
const setUser = (ctx: GlobalStateContext, username: String) => {
  const user = {
    username: username,
  }
  ctx.dispatch(state => ({
    ...state,
    app: {
      ...state.app,
      user: user
    }
  }))
}

const getUser = (ctx: GlobalStateContext) => {
  const { readState } = useActions();
  const userObj = readState(m => m.app.user) 
  return userObj
}

const piral = renderInstance({
  layout,
  actions: {
    setUser,
    getUser,
  },
  plugins: [createCustomeApi(), createContainersApi()],
  extendApi: [createContainersApi()],
  requestPilets() {
    return fetch('http://localhost:9000/api/v1/pilet')
      .then((res) => res.json())
      .then((res) => res.items);
  },
})

piral.root.setData('app-shell-set-data', 'APP SHELL set data.');