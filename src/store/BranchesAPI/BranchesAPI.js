import { Branches, StateNamesAPI, apiSlice } from "../index"


export const BranchesAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        Branches: build.mutation({
            query: ({ id }) => ({
                url: Branches.Branch,
                method: "GET",
            }),
        }),

        AddBranch: build.mutation({
            query: ({ data }) => ({
                url: Branches.Branch,
                method: "POST",
                data: data,
                body: data,

            }),
        }),

        PutBranch: build.mutation({
            query: ({ data }) => ({
                url: Branches.Branch,
                method: "PUT",
                data: data,
                body: data,

            }),
        }),

        DeleteBranch: build.mutation({
            query: ({ id }) => ({
                url: `/Branch/${id}`,
                method: "DELETE",

            }),
        }),

        BranchByID: build.mutation({
            query: ({ id }) => ({
                url: `/Branch/${id}`,
                method: "GET",

            }),
        }),
        BranchByCountryID: build.mutation({
            query: ({ countryid }) => ({
                url: `/Branch/GetByCountry/${countryid}`,
                method: "GET",

            }),
        }),
        Countries: build.mutation({
            query: ({ id }) => ({
                url: Branches.Country,
                method: "GET",

            }),
        }),

        CountryByID: build.mutation({
            query: ({ id }) => ({
                url: `/Country/${id}`,
                method: "GET",

            }),
        }),

        DeleteCountry: build.mutation({
            query: ({ id }) => ({
                url: `/Country/${id}`,
                method: "DELETE",

            }),
        }),

        StateNames: build.mutation({
            query: ({ id }) => ({
                url: StateNamesAPI.StateNames,
                method: "GET",

            }),
        }),

        AddCountry: build.mutation({
            query: ({ data }) => ({
                url: Branches.Country,
                method: "POST",
                data: data,
                body: data,

            }),
        }),

    }),

});

export const { useBranchesMutation, 
    useCountriesMutation, 
    useCountryByIDMutation,
    useDeleteCountryMutation,
    useBranchByCountryIDMutation,
    useAddCountryMutation,
    useAddBranchMutation,
    useStateNamesMutation,
    useDeleteBranchMutation,
    useBranchByIDMutation,
    usePutBranchMutation,
} = BranchesAPI;