import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuResponseState {
  menuResponse?: any | undefined;
}

const initialState: MenuResponseState = {
  menuResponse: undefined,
};

const reducer = createSlice({
  name: "menuRouteInfo",
  initialState,
  reducers: {
    setMenuReponse: (state, { payload }: PayloadAction<{ value: any }>) => {
      if (payload) {
        state.menuResponse = payload.value;
      }
    },
  },
  extraReducers: () => {},
});

export const {
  reducer: MenuDataReducer,
  actions: { setMenuReponse },
} = reducer;
