import commentsReducer from "./comments";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";
import blogReducer from "./blog";
import blogCommentReducer from "./blogComments";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer,
    blog: blogReducer,
    blogComments: blogCommentReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
