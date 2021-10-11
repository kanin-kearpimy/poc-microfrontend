import * as React from 'react';
import { History } from 'history';
import { product } from './product';
import { Link } from 'react-router-dom';

export interface ProductPageProps {
  name: string;
  history: History;
  BuyButton: React.ComponentType<{
    item: string;
  }>;
  Recommendations: React.ComponentType<{
    item: string;
  }>;
  BasketInfo: React.ComponentType;
}

export const ProductPage: React.FC<ProductPageProps> = ({ name, history, BasketInfo, BuyButton, Recommendations }) => {
  const [variant] = product.variants.filter((v) => name === v.sku);

  return (
    variant && (
      <>
        <div id="menu">
          <li><Link to="/yellow">Shared component (extension)</Link></li>
          <li><Link to="/state">State Management</Link></li>
        </div>
        <h1 id="store">The Model Store</h1>
        <BasketInfo />
        <div id="image">
          <div>
            <img src={variant.image} alt={variant.name} />
          </div>
        </div>
        <h2 id="name">
          {product.name} <small>{variant.name}</small>
        </h2>
        <div id="options">
          {product.variants.map((variant) => (
            <button
              key={variant.sku}
              className={name === variant.sku ? 'active' : ''}
              type="button"
              onClick={() => history.push(`/products/${variant.sku}`)}>
              <img src={variant.thumb} alt={variant.name} />
            </button>
          ))}
        </div>
        <BuyButton item={variant.sku} />
        <Recommendations item={variant.sku} />
      </>
    )
  );
};
