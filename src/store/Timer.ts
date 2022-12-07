import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment-timezone';
interface WP {
  time: string;
  wallpaper: string;
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    allTimeZone: <string[]>[],
    timeZone: 'Asia/Kolkata',
    timeNow: <moment.Moment>(<unknown>null),
    wallPaperImage: <WP[]>[{time:"1am"},{time:"2am"}],
  },
  reducers: {
    setallTimeZone: (state, action: PayloadAction<string[]>) => {
      state.allTimeZone = action.payload;
    },
    setTimeZone: (state, action: PayloadAction<string>) => {
      state.timeZone = action.payload;
    },
    setTimeNow: (state, action: PayloadAction<moment.Moment>) => {
      state.timeNow = action.payload;
    },
    setWallPaperImage: (state, action: PayloadAction<WP[]>) => {
      state.wallPaperImage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setallTimeZone, setTimeZone, setTimeNow, setWallPaperImage} =
  counterSlice.actions;

export default counterSlice.reducer;
