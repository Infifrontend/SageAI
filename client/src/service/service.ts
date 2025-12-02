import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CommonService = createApi({
  reducerPath: "CommonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import .meta.env.VITE_API_URL,
    credentials: "include",
  }),
  endpoints: () => ({}),
});

export { CommonService };
