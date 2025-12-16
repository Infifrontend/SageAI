import { CommonService } from "../service";

const organisationService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getOrganisationData: build.query<any, any>({
      query: () => "api/management/organizations/",
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetOrganisationDataQuery } = organisationService;
