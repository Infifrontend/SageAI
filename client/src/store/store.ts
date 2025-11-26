import { configureStore } from "@reduxjs/toolkit";
import { CommonService } from "@/service/service";

export const store = configureStore({
  reducer: {
    [CommonService.reducerPath]: CommonService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CommonService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
