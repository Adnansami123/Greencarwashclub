import {
  UserAPIs_Users,
  apiSlice,
  assetAPIs_Assets,
  Configurations,
  Clients,
} from "../index";

export const ClientsAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.mutation({
      query: ({ id, userXid = -1, clientXid = -1 }) => ({
        // url: assetAPIs_Assets.getAssetByID`${'5'}`,
        // url: assetAPIs_Assets.getAssetByID`${5}`,
        url: Clients.Clients + `${id}/${userXid}/${clientXid}`,
        method: "GET",
      }),
    }),
    getClientByID: build.mutation({
      query: ({ id }) => ({
        // url: assetAPIs_Assets.getAssetByID`${'5'}`,
        // url: assetAPIs_Assets.getAssetByID`${5}`,
        url: `/Client/${id}`,
        method: "GET",
        query: { Id: 5 },
      }),
    }),
    AddClient: build.mutation({
      query: ({ data }) => ({
        url: Clients.AddClients,
        method: "POST",
        data: data,
        body: data,
      }),
    }),
    putClient: build.mutation({
      query: ({ data }) => ({
        url: Clients.AddClients,
        method: "PUT",
        data: data,
        body: data,
      }),
    }),
    deleteClient: build.mutation({
      query: ({ id }) => ({
        // url: assetAPIs_Assets.deleteAssetByID,
        url: `/Client/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetClientByIDMutation,
  useGetClientsMutation,
  usePutClientMutation,
} = ClientsAPI;
