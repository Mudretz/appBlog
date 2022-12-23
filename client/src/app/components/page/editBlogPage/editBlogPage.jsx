import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import { useSelector, useDispatch } from "react-redux";
import BackHistoryButton from "../../common/backButton";
import { getBlogbyId, updateblog } from "../../../store/blog";
import PropTypes from "prop-types";

const EditBlogPage = ({ id }) => {
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const blog = useSelector(getBlogbyId(id));
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        if (blog && !data) {
            setData({
                ...blog
            });
        }
    }, [blog, data]);
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Введите название"
            }
        },
        written: {
            isRequired: {
                message: "Введите текст"
            }
        },
        text: {
            isRequired: {
                message: "Введите текст"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { name, written, text, _id } = data;
        const newData = {
            _id: _id,
            name: name,
            written: written,
            text: text
        };
        dispatch(updateblog(newData));
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h1>Добавление статьи</h1>
                        {!isLoading && blog ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Название статьи"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Короткий текст"
                                    type="text"
                                    name="written"
                                    value={data.written}
                                    onChange={handleChange}
                                    error={errors.written}
                                />
                                <TextAreaField
                                    label="Полный текст статьи"
                                    type="text"
                                    name="text"
                                    value={data.text}
                                    onChange={handleChange}
                                    error={errors.text}
                                />
                                <button
                                    className="btn btn-primary btn-lg"
                                    disabled={!isValid}
                                    type="submit"
                                >
                                    Изменить
                                </button>
                            </form>) : (
                                "Loading"
                            )}
                </div>
            </div>
        </div>
    );
};

EditBlogPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default EditBlogPage;
