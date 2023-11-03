import {configureStore} from '@reduxjs/toolkit';

// import authReducer from "../../features/auth/authSlice";
// import coinsReducer from "../../features/coins/coinsSlice";
import notificationsReducer from '../../features/notifications/notificationsSlice';
// import achivementsReducer from "../../features/achievements/achievementsSlice";
// import horsesReducer from "../../features/horses/horseSlice";
// import offersReducer from "../../features/offers/offersSlice";
// import couponReducer from "../../features/coupons/couponsSlice";

export const store = configureStore({
  reducer: {
    notification: notificationsReducer,
  },

  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
