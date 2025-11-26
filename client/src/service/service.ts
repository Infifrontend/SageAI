import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CommonService = createApi({
  reducerPath: "CommonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
    prepareHeaders: (headers) => {
      // Token is automatically sent via cookies with credentials: "include"
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export { CommonService };
