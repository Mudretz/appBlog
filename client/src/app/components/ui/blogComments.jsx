import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createBlogComment, getBlogComments, getBlogCommentsLoadingStatus, loadBlogCommentsList, removeBlogComment } from "../../store/blogComments";

const BlogComments = () => {
    const { blogId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBlogCommentsList(blogId));
    }, [blogId]);
    const isLoading = useSelector(getBlogCommentsLoadingStatus());
    const blogComments = useSelector(getBlogComments());
    const handleSubmit = (data) => {
        dispatch(createBlogComment({ ...data, pageId: blogId }));
    };
    const handleRemoveComment = (id) => {
        console.log(id);
        dispatch(removeBlogComment(id));
    };
    const sortedblogComments = orderBy(blogComments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedblogComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Комментарии</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedblogComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogComments;
