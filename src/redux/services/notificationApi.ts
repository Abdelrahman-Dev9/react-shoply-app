// import { baseApi } from "./baseApi";

// export const notificationApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getNotifications: builder.query({
//       query: () => ({
//         url: "/admin/notification",
//         method: "GET",
//         headers: {
//           Authorization: `${localStorage.getItem("token")}`,
//         },
//       }),

//       providesTags: ["Notifications"],
//     }),

//     sendNotification: builder.mutation({
//       query: (body) => ({
//         url: "/admin/notification",
//         method: "POST",
//         body,
//         headers: {
//           Authorization: `${localStorage.getItem("token")}`,
//         },
//       }),

//       invalidatesTags: ["Notifications"],
//     }),
//   }),
// });

// export const { useGetNotificationsQuery, useSendNotificationMutation } =
//   notificationApi;
import { baseApi } from "./baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/admin/notification",
        method: "GET",
      }),

      providesTags: ["Notifications"],
    }),

    sendNotification: builder.mutation({
      query: (body) => ({
        url: "/admin/notification",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery, useSendNotificationMutation } =
  notificationApi;
