import * as React from 'react';

export interface YellowPageProps {
  BasketInfo: React.ComponentType;
}

export const YellowPage: React.FC<YellowPageProps> = ({ BasketInfo }) => {
  return (
    <div className="royalblue-border main-layout">
      <div className="yellow-recos">
        <h1>Hello Yellow Team!!!</h1>
      </div>
      <BasketInfo />
    </div>
  );
};
