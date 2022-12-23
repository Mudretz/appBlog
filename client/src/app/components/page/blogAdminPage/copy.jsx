import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteblog, getBlogСurrentUser } from "../../../store/blog";
import { getCurrentUserId } from "../../../store/users";
import history from "../../../utils/history";
import AddBlog from "../../ui/addBlog";

const BlogAdminPage = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const blogsCurrentUser = useSelector(getBlogСurrentUser(currentUserId));
    const params = useParams();
    const dispatch = useDispatch();
    const { addBlog } = params;
    const handleDelete = (e) => {
        dispatch(deleteblog(e));
    };
    const handleClick = () => {
        history.push(history.location.pathname + "/addBlog");
    };
    return (
        <>
            {addBlog ? (
                <AddBlog />
            ) : (
                <div className="container overflow-hidden text-start position-relative">
                    <button
                        className="btn btn-primary btn-lg position-absolute top-0 end-0"
                        onClick={handleClick}
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
                                            onClick={() => handleClick(item._id)}
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
            )}
        </>
    );
};

export default BlogAdminPage;
