import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const submissionsAdapter = createEntityAdapter({});

const initialState = submissionsAdapter.getInitialState();

export const submissionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubmissions: builder.query({
            query: () => '/submissions',
            validateStatus: (response, result) => response.status === 200 && !result.isError,
            transformResponse: (responseData) => {
                if (!responseData) {
                    return [];
                }
                const loadedSubmissions = responseData.map((submission) => {
                    submission.id = submission._id;
                    return submission;
                });
                return submissionsAdapter.setAll(initialState, loadedSubmissions);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Submission', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Submission', id })),
                    ];
                } else return [{ type: 'Submission', id: 'LIST' }];
            },
        }),
        getSubmissionLanguages: builder.query({
            query: () => '/submissions/languages',
            validateStatus: (response, result) => response.status === 200 && !result.isError,
            transformResponse: (responseData) => {
                const loadedSubmissionLanguages = responseData.map((language) => {
                    return language;
                });
                return submissionsAdapter.setAll(initialState, loadedSubmissionLanguages);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'SubmissionLanguages', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'SubmissionLanguages', id })),
                    ];
                } else return [{ type: 'SubmissionLanguages', id: 'LIST' }];
            },
        }),

        addNewSubmission: builder.mutation({
            query: (initialSubmissionData) => ({
                url: '/submissions',
                method: 'POST',
                headers:{
                    timeSubmitted: new Date (Date.now()),
                },
                body: {
                    ...initialSubmissionData,
                },
            }),
            invalidatesTags: [{ type: 'Submission', id: "LIST" }],
        }),

        updateSubmission: builder.mutation({
            query: (initialSubmissionData) => ({
                url: `/submissions`,
                method: 'PATCH',
                body: {
                    ...initialSubmissionData,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Submission', id: arg.id },
            ],
        }),

        deleteSubmission: builder.mutation({
            query: ({ id }) => ({
                url: `/submissions`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Submission', id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetSubmissionsQuery,
    useGetSubmissionLanguagesQuery,
    useAddNewSubmissionMutation,
    useUpdateSubmissionMutation,
    useDeleteSubmissionMutation,
} = submissionsApiSlice;

// returns the query result object
export const selectSubmissionsResult = submissionsApiSlice.endpoints.getSubmissions.select();

// creates memoized selector
const selectSubmissionsData = createSelector(
    selectSubmissionsResult,
    (submissionsResult) => submissionsResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllSubmissions,
    selectById: selectSubmissionById,
    selectIds: selectSubmissionIds,
} = submissionsAdapter.getSelectors((state) => selectSubmissionsData(state) ?? initialState);


