import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CommonService = createApi({
  reducerPath: "CommonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});

export { CommonService };
