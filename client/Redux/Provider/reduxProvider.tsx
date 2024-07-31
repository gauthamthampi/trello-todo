// components/ReduxProvider.tsx
'use client'; // This directive makes the component a client component

import { Provider } from 'react-redux';
import store from '../Store/store';

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
