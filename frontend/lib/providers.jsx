'use client';

import { Provider } from 'react-redux';
import { store } from './store'; // adjust the path according to your store location

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}