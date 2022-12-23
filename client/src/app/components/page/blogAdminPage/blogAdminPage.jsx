import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteblog, getBlogСurrentUser } from "../../../store/blog";
import { removeAllBlogComment } from "../../../store/blogComments";
import { getCurrentUserId } from "../../../store/users";
import history from "../../../utils/history";
import EditBlogPage from "../editBlogPage/editBlogPage";

const BlogAdminPage = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const blogsCurrentUser = useSelector(getBlogСurrentUser(currentUserId));
    const params = useParams();
    const dispatch = useDispatch();
    const { id, edit } = params;
    const handleDelete = (item) => {
        dispatch(deleteblog(item));
        dispatch(removeAllBlogComment(item._id));
    };
    const handleClick = (addRes) => {
        if (addRes === "/addBlog") {
            return history.push(addRes);
        }
        history.push(history.location.pathname + addRes);
    };
    if (id && edit) {
        return (
            <EditBlogPage id={id}/>
        );
    } else if (blogsCurrentUser.length > 0) {
        return (
            <div className="container overflow-hidden text-start position-relative">
                <button
                    className="btn btn-primary btn-lg position-absolute top-0 end-0"
                    onClick={() => handleClick("/addBlog")}
                    type="button"
                >
                        Создать статью
                </button>
                <h1>Статьи</h1>
                { blogsCurrentUser.length > 0 ? (
                    <div className="row gy-5">
                        {blogsCurrentUser.map((item) => (
                        <div className="col-6" key={item._id}>
                            <div className="p-3 border bg-light position-relative">
                                <p className="text-start">{item.name}</p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-danger btn-lg"
                                        onClick={() => handleDelete(item)}
                                        type="button"
                                    >
                                        Удалить
                                    </button>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={() => handleClick(`/${item._id}/edit`)}
                                        type="button"
                                    >
                                        Редактировать
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    ) : (
                        <h5>На данный момент у вас нет блогов</h5>
                    )}
            </div>
        );
    } else {
        return (
            <div className="container overflow-hidden text-start position-relative">
                <button
                    className="btn btn-primary btn-lg position-absolute top-0 end-0"
                    onClick={() => handleClick("/addBlog")}
                    type="button"
                >
                        Создать статью
                </button>
                <h1>Статьи</h1>
                <h5>На данный момент у вас нет блогов</h5>
            </div>
        );
    };
};

export default BlogAdminPage;
