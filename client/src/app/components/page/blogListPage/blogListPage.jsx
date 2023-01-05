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
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="row col-8">
                                {blogs.map((item) => (
                                <div className="col-12" key={item._id}>
                                    <div className="p-4 border bg-white mb-4 text-start">
                                        <div className="d-flex">
                                            <img
                                                src={item.image}
                                                alt=""
                                                height="35"
                                                className="img-responsive border"
                                            />
                                            <div className="m-2">
                                                <p className="h6">{item.author} <span className="text-muted time-at">Сегодня в {item.created_at.slice(11, 16)}</span></p>
                                            </div>
                                        </div>
                                        <h3>{item.name}</h3>
                                        <p>{item.written}</p>
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => handleClick(item._id)}
                                            type="button"
                                        >
                                            Читать полностью...
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className="container col-4 border bg-white">
                                Дополнительный блог
                            </div>
                        </div>
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
