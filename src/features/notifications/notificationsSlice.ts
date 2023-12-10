import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

interface NotificationState {
  token: string | null;

  coinsCount: number;
  showCoinsModal: boolean;
  showCoinsModalAnimation: boolean;
}

const initialState: NotificationState = {
  token: null,
  coinsCount: 0,
  showCoinsModal: false,
  showCoinsModalAnimation: false,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showCoinsModal: state => {
      state.showCoinsModal = true;
    },
    hideCoinsModal: state => {
      state.showCoinsModal = false;
      state.showCoinsModalAnimation = false;
      AsyncStorage.removeItem('coinsToShow');
    },
    showCoinsModalAnimation: (state, payload) => {
      state.showCoinsModalAnimation = true;
      state.coinsCount = payload.payload;
    },
    hideCoinsModalAnimation: state => {
      state.showCoinsModalAnimation = false;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    deleteToken: state => {
      state.token = null;
    },
  },
});

export default notificationSlice.reducer;
