import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://events.johngaitho.info/api/v1';
// const  baseUrl = 'http://localhost:5000/api/v1'

export const createRequest = (url, method = 'GET', body = {}, is_form = false) => {
    let req = { url, method: method, formData: is_form };
    if (['POST', 'PUT'].indexOf(method) !== -1) req.body = body;
    return req;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        authenticate: builder.mutation({
            query: (body) => createRequest(`/login`, 'POST', body),
        }),
        register: builder.mutation({
            query: (body) => createRequest('/users', 'POST', body),
        }),
        getUsers: builder.query({
            query: () => createRequest(`/users`),
        }),
        getUserById: builder.query({
            query: (userId) => createRequest(`/users/${userId}`),
        }),
        getCountries: builder.query({
            query: () => createRequest(`/countries`),
        }),
        getVenues: builder.query({
            query: () => createRequest(`/venues`),
            providesTags: ['venuesList'],
        }),
        getEvents: builder.query({
            query: () => createRequest(`/events`),
            providesTags: ['EventsList'],
        }),
        createEvent: builder.mutation({
            query: (body) => createRequest('/events', 'POST', body, true),
            async onQueryStarted(body, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['getEvents', 'EventList']));
            },
        }),
        createEventTrack: builder.mutation({
            query: (data) => createRequest(`/events/${data.eventId}/event_tracks`, 'POST', data.body, true),
            providesTags: ['createEventTrack'],
            async onQueryStarted(data, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['getEventDetails']));
            },
        }),
        getEventDetails: builder.query({
            query: (eventId) => createRequest(`/events/${eventId}`),
            providesTags: ['getEventDetails'],
        }),
        getEventTrackDetails: builder.query({
            query: (eventTrackId) => createRequest(`/event_tracks/${eventTrackId}`),
            providesTags: ['getEventTrackDetails'],
        }),
        updateEvent: builder.mutation({
            query: (data) => createRequest(`/events/${data.eventId}`, 'PUT', data.body, true),
            providesTags: ['updateEvent'],
            async onQueryStarted(body, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['getEvents']));
            },
        }),
        updateEventTrack: builder.mutation({
            query: (data) => createRequest(`/event_tracks/${data.eventTrackId}`, 'PUT', data.body, true),
            providesTags: ['updateEventTrack'],
            async onQueryStarted(body, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['getEventDetails, getEventTrackDetails']));
            },
        }),
        deleteEvent: builder.mutation({
            query: (eventId) => createRequest(`/events/${eventId}`, 'DELETE'),
            providesTags: ['deleteEvent'],
            async onQueryStarted(body, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['getEvents', 'getEventDetails']));
            },
        }),
        deleteEventTrack: builder.mutation({
            query: (eventTrackId) => createRequest(`/event_tracks/${eventTrackId}`, 'DELETE'),
            providesTags: ['deleteEventTrack'],
            async onQueryStarted(body, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['getEventDetails']));
            },
        }),
        registerAttendee: builder.mutation({
            query: (body) => createRequest(`/events/${body.eventId}/users/${body.userId}`, 'POST'),
            async onQueryStarted(body, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['getEventDetails']));
            },
        }),
        deRegisterAttendee: builder.mutation({
            query: (body) =>
              createRequest(`/events/${body.eventId}/users/${body.userId}`, 'DELETE'),
            async onQueryStarted(body, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['getEventDetails']));
            },
        }),
        createVenue: builder.mutation({
            query: (body) => createRequest(`/venues`, 'POST', body),
            async onQueryStarted(body, { dispatch }) {
                dispatch(apiSlice.util.invalidateTags(['venuesList']));
            },
        }),
    }),
});

export const {
    useAuthenticateMutation,
    useRegisterMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetCountriesQuery,
    useGetVenuesQuery,
    useGetEventsQuery,
    useCreateEventMutation,
    useCreateEventTrackMutation,
    useGetEventDetailsQuery,
    useGetEventTrackDetailsQuery,
    useUpdateEventMutation,
    useUpdateEventTrackMutation,
    useDeleteEventMutation,
    useDeleteEventTrackMutation,
    useRegisterAttendeeMutation,
    useDeRegisterAttendeeMutation,
    useCreateVenueMutation,
} = apiSlice;
