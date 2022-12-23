import React from "react";
import { useSelector } from "react-redux";
import { getBlog } from "../../../store/blog";
import history from "../../../utils/history";

const BlogListPage = () => {
    const blogs = useSelector(getBlog());
    const handleClick = (id) => {
        history.push(history.location.pathname + `${id}`);
    };
    return (
        <>
            { blogs.length > 0 ? (
                <div className="container overflow-hidden text-center">
                    <div className="row gy-5">
                        {blogs.map((item) => (
                        <div className="col-6" key={item._id}>
                            <div className="p-3 border bg-light">
                                <h2 className="text-start">{item.name}</h2>
                                <p className="text-start">{item.written}</p>
                                <p className="text-end">Автор статьи: {item.author}</p>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => handleClick(item._id)}
                                    type="button"
                                >
                                    Открыть
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h2>На данный момент нет никаких блогов</h2>
                )
            }
        </>
);
};

export default BlogListPage;
