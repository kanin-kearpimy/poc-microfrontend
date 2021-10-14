import * as React from 'react';
import { PiletApi } from 'app-shell';
import { ProductPage } from './ProductPage';

export function setup(app: PiletApi) {
  
  app.registerPage('/products/:name?', ({ history, match, piral }) => {
    const userObj = app.getUser();
    return(
    <ProductPage
      name={match.params.name || 'porsche'}
      history={history}
      userObj={userObj}
      BasketInfo={() => <piral.Extension name="basket-info" />}
      BuyButton={({ item }) => <piral.Extension name="buy-button" params={{ item }} />}
      Recommendations={({ item }) => <piral.Extension name="recommendations" params={{ item }} />}
    />
  )});
}
