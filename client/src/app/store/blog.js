import { createAction, createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blog.service";
import history from "../utils/history";

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        blogRequested: (state) => {
            state.isLoading = true;
        },
        blogReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        blogRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        blogAdd: (state, action) => {
            state.entities.push(action.payload);
        },
        blogDelete: (state, action) => {
            state.entities = state.entities.filter(item => item._id !== action.payload);
        },
        blogUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        }
    }
});

const addBlogFailed = createAction("blog/addBlogFailed");
const addBlogRequested = createAction("blog/addBlogRequested");
const deleteBlogRequested = createAction("blog/deleteBlogRequested");
const deleteBlogFailed = createAction("blog/deleteBlogFailed");
const updateBlogRequested = createAction("blog/updateBlogRequested");
const updateBlogFailed = createAction("blog/updateBlogFailed");

const { reducer: blogReducer, actions } = blogSlice;
const { blogRequested, blogReceved, blogRequestFiled, blogAdd, blogDelete, blogUpdate } = actions;

export const getBlog = () => (state) => state.blog.entities;
export const getBlogLoadingStatus = () => (state) =>
    state.blog.isLoading;
export const getBlogbyId = (id) => (state) => {
    if (state.blog.entities) {
        return state.blog.entities.find((p) => p._id === id);
    }
};
export const getBlogСurrentUser = (id) => (state) => {
    if (state.blog.entities) {
        return state.blog.entities.filter((p) => p.userId === id);
    }
};
export const createBlog = (payload) => async (dispatch) => {
    dispatch(addBlogRequested());
    try {
        const { content } = await blogService.create(payload);
        dispatch(blogAdd(content));
        history.replace("/blogAdmin");
    } catch (error) {
        dispatch(addBlogFailed(error.message));
    }
};
export const loadBlogList = () => async (dispatch) => {
        dispatch(blogRequested());
        try {
            const { content } = await blogService.get();
            dispatch(blogReceved(content));
        } catch (error) {
            dispatch(blogRequestFiled(error.message));
        }
};
export const deleteblog = (payload) => async (dispatch) => {
    dispatch(deleteBlogRequested());
    try {
        const { content } = await blogService.delete(payload);
        dispatch(blogDelete(content));
    } catch (error) {
        dispatch(deleteBlogFailed(error.message));
    }
};
export const updateblog = (payload) => async (dispatch) => {
    dispatch(updateBlogRequested());
    try {
        const { content } = await blogService.update(payload);
        dispatch(blogUpdate(content));
        history.replace("/blogAdmin");
    } catch (error) {
        dispatch(updateBlogFailed(error.message));
    }
};

export default blogReducer;
