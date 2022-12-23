import { createAction, createSlice } from "@reduxjs/toolkit";
import blogCommentService from "../services/blogComment.service";
const blogCommentSlice = createSlice({
    name: "blogComment",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        blogCommentRequested: (state) => {
            state.isLoading = true;
        },
        blogCommentReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        blogCommentRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
       blogCommentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        blogCommentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        blogAllCommentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c.pageId !== action.payload
            );
        }
    }
});

const { reducer: blogCommentReducer, actions } = blogCommentSlice;
const {
    blogCommentRequested,
    blogCommentReceved,
    blogCommentRequestFiled,
    blogCommentCreated,
    blogCommentRemoved,
    blogAllCommentRemoved
} = actions;

const addBlogCommentRequested = createAction("blogComments/addBlogCommentRequested");
const removeBlogCommentRequested = createAction("blogComments/removeBlogCommentRequested");
const removeAllBlogCommentRequested = createAction("blogComments/removeAllBlogCommentRequested");

export const loadBlogCommentsList = (blogId) => async (dispatch) => {
    dispatch(blogCommentRequested());
    try {
        const { content } = await blogCommentService.getBlogComment(blogId);
        dispatch(blogCommentReceved(content));
    } catch (error) {
        dispatch(blogCommentRequestFiled(error.message));
    }
};
export const createBlogComment = (payload) => async (dispatch, getState) => {
    dispatch(addBlogCommentRequested());
    try {
        const { content } = await blogCommentService.createBlogComment(payload);
        dispatch(blogCommentCreated(content));
    } catch (error) {
        dispatch(blogCommentRequestFiled(error.message));
    }
};
export const removeBlogComment = (commentId) => async (dispatch) => {
    dispatch(removeBlogCommentRequested());
    try {
        const { content } = await blogCommentService.removeBlogComment(commentId);
        if (!content) {
            dispatch(blogCommentRemoved(commentId));
        }
    } catch (error) {
        dispatch(blogCommentRequestFiled(error.message));
    }
};
export const removeAllBlogComment = (pageId) => async (dispatch) => {
    dispatch(removeAllBlogCommentRequested());
    try {
        const { content } = await blogCommentService.removeAllBlogComment(pageId);
        if (!content) {
            dispatch(blogAllCommentRemoved(pageId));
        }
    } catch (error) {
        dispatch(blogCommentRequestFiled(error.message));
    }
};

export const getBlogComments = () => (state) => state.blogComments.entities;
export const getBlogCommentsLoadingStatus = () => (state) =>
    state.blogComments.isLoading;

export default blogCommentReducer;
