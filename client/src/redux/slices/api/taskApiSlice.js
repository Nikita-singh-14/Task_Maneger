import { apiSlice } from "../apislice"

const TASKS_URL = "/task"

export const taskApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getALLTask: builder.query({
            query: ({ strQuery, isTrashed, search }) => ({

            }),
        }),

        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        duplicateTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/duplicate/${id}`,
                method: "POST",
                body: {},
                credentials: "include",
            }),
        }),
        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/update/${data._id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        trashTask: builder.mutation({
            query: ({ id }) => ({
                url: `${TASKS_URL}/${id}`,
                method: "PUT",
                credentials: "include",
            }),
        }),
        createSubTask: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASKS_URL}/create-subtask/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        getSingleTask: builder.query({
            query: ({ id }) => ({
                url: `${TASKS_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        postTaskActivity: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASKS_URL}/activity/${id}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        deleteRestoreTask: builder.mutation({
            query: ({ id, actionType }) => ({
                url: `${TASKS_URL}/delete-restore/${id}?actionType=${actionType}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useGetDashbpardStatsQuery,
    useGetALLTaskQuery,
    useCreateTaskMutation,
    useDuplicateTaskMutation,
    useUpdateTaskMutation,
    useTrashTaskMutation,
    useCreateSubTaskMutation,
    useGetSingleTaskQuery,
    usePostTaskActivityMutation,
    useDeleteRestoreTaskMutation
} = taskApiSlice;