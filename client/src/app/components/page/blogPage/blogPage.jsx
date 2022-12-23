import React from "react";
import { useSelector } from "react-redux";
import { getBlogbyId } from "../../../store/blog";
import PropTypes from "prop-types";
import BackHistoryButton from "../../common/backButton";
import BlogComments from "../../ui/blogComments";
import { getIsLoggedIn } from "../../../store/users";

const BlogPage = ({ id }) => {
    const blog = useSelector(getBlogbyId(id));
    const isLoggedIn = useSelector(getIsLoggedIn());
    if (blog) {
        return (
        <>
            <div className="container overflow-hidden text-start ">
                <BackHistoryButton />
                <div className="row gy-5">
                    <div className="col-6">
                        <h2 className="text-start">{blog.name}</h2>
                        <div className="p-3 border bg-light">
                            <p className="text-start">{blog.text}</p>
                            <p className="text-end">Автор статьи: {blog.author}</p>
                            {isLoggedIn ? <BlogComments /> : null}
                            {!isLoggedIn ? (
                                <div className="card mb-3">
                                    <div className="card-body ">
                                        <h2>Комментарии</h2>
                                        <hr />
                                        <p>Чтобы увидеть комменатрии войдите через свой аккаунт или зарегистрируйтесь</p>
                                    </div>
                                </div>
                            ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} else {
    return (
    <h1>Loading...</h1>
    );
    };
};

BlogPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default BlogPage;
