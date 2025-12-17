import { CommonService } from "../service";

const organisationService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getOrganisationData: build.query<any, any>({
      query: (params) => {
        const { page = 1, page_size = 6 } = params || {};
        return `api/management/organizations/?page=${page}&page_size=${page_size}`;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetOrganisationDataQuery } = organisationService;
