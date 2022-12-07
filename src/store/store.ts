import {configureStore} from '@reduxjs/toolkit';
import Timer from './Timer';

const store = configureStore({
  reducer: {Timer},
});
export default store;
