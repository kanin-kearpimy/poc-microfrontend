import * as React from 'react';
import { useGlobalState } from 'piral';

export const TestPage: React.FC = () => {

  const test = useGlobalState((m) => m.language.selected);
  return (
    <>
      <h3>TEST: {test}</h3>
    </>
  );
};
