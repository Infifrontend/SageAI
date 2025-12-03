import { configureStore } from "@reduxjs/toolkit";
import { CommonService, LocalService } from "@/service/service";
import { MenuDataReducer } from "./menu.store";

export const store = configureStore({
  reducer: {
    MenuDataReducer,
    [CommonService.reducerPath]: CommonService.reducer,
    [LocalService.reducerPath]: LocalService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(CommonService.middleware)
      .concat(LocalService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
