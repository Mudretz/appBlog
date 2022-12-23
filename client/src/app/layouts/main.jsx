import React from "react";
import BlogListPage from "../components/page/blogListPage";
import BlogPage from "../components/page/blogPage";
import { useParams } from "react-router-dom";

const Main = () => {
    const params = useParams();
    const { blogId } = params;

    return (
        <>
            {blogId ? (
                <BlogPage id={blogId}/>
            ) : (
                <BlogListPage />
            )}
        </>
    );
};

export default Main;
